import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import * as dotenv from "dotenv";
import * as cognito from "aws-cdk-lib/aws-cognito";
import {
  makeReadbleNote3BucketIamRole,
  makeUnauthenticatedNote3BucketIamRole,
} from "../service/iam";

dotenv.config();

type AuthStackProps = {
  env: string;
  s3Bucket: s3.Bucket;
};

export class AuthStack extends cdk.Stack {
  readonly s3Bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: AuthStackProps) {
    super(scope, id, {
      env: { region: process.env.REGION || "" },
      crossRegionReferences: true,
    });
    this.s3Bucket = props.s3Bucket;

    const { region, accountId } = new cdk.ScopedAws(this);

    // cognito userpool
    const userPool = new cognito.UserPool(this, `${props.env}Note3UserPool`, {
      signInAliases: {
        username: true,
        phone: false,
        email: false,
        preferredUsername: true,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      signInCaseSensitive: true,
      accountRecovery: cognito.AccountRecovery.NONE,
      selfSignUpEnabled: false,
      email: cognito.UserPoolEmail.withCognito(),
    });

    // cognito domain
    const domain = userPool.addDomain("userPoolDomain", {
      cognitoDomain: { domainPrefix: process.env.COGNITO_DOMAIN || "" },
    });

    // cognito app client
    const appClient = userPool.addClient("userPoolAppClient", {
      generateSecret: false,
      oAuth: {
        callbackUrls: [process.env.FRONT_CALLBACK_URL || ""],
        logoutUrls: [process.env.LOGOUT_URL || ""],
        scopes: [cognito.OAuthScope.OPENID],
        flows: {
          authorizationCodeGrant: true,
          implicitCodeGrant: false,
        },
      },
    });

    // cognito Identity pool
    const idPool = new cognito.CfnIdentityPool(
      this,
      `${props.env}Note3IdPool`,
      {
        allowUnauthenticatedIdentities: false,
        cognitoIdentityProviders: [
          {
            providerName: userPool.userPoolProviderName,
            clientId: appClient.userPoolClientId,
          },
        ],
      }
    );

    // read s3 iam role
    const authenticatedRole = makeReadbleNote3BucketIamRole(
      this,
      props.env,
      this.s3Bucket.bucketName,
      idPool.ref
    );

    // read s3 iam role
    const unauthenticatedRole = makeUnauthenticatedNote3BucketIamRole(
      this,
      props.env,
      this.s3Bucket.bucketName,
      idPool.ref
    );

    // cognito Identity pool attaching role
    new cognito.CfnIdentityPoolRoleAttachment(this, "roleAttachment", {
      identityPoolId: idPool.ref,
      roles: {
        authenticated: authenticatedRole.iamRole.roleArn,
        unauthenticated: unauthenticatedRole.iamRole.roleArn,
      },
    });

    const bucketPolicyStatement = new cdk.aws_iam.PolicyStatement({
      actions: ["s3:GetObject"],
      effect: cdk.aws_iam.Effect.ALLOW,
      principals: [
        new cdk.aws_iam.ServicePrincipal("cloudfront.amazonaws.com"),
      ],
      resources: [`${this.s3Bucket.bucketArn}/*`],
    });
    bucketPolicyStatement.addCondition("StringLike", {
      "AWS:SourceArn": `arn:aws:cloudfront::${
        cdk.Stack.of(this).account
      }:distribution/*`,
    });

    this.s3Bucket.addToResourcePolicy(bucketPolicyStatement);
  }
}
