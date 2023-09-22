import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";

export const makeReadbleNote3BucketIamRole = (
  scope: Construct,
  env: string,
  bucketName: string,
  idPoolId: string
) => {
  const iamPolicy = new iam.PolicyDocument({
    statements: [
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["s3:ListBucket"],
        resources: [`arn:aws:s3:::${bucketName}`],
      }),
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["s3:GetObject"],
        resources: [`arn:aws:s3:::${bucketName}/*`],
      }),
    ],
  });

  const iamRole = new iam.Role(scope, "authenticatedNote3Role", {
    assumedBy: new iam.FederatedPrincipal(
      "cognito-identity.amazonaws.com",
      {
        StringEquals: {
          "cognito-identity.amazonaws.com:aud": idPoolId,
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated",
        },
      },
      "sts:AssumeRoleWithWebIdentity"
    ),
    inlinePolicies: {
      [`authenticated${env}Note3S3`]: iamPolicy,
    },
    roleName: `Authenticated${env}Note3RoleForAuthedUser`,
  });

  return {
    iamRole,
  };
};

export const makeUnauthenticatedNote3BucketIamRole = (
  scope: Construct,
  env: string,
  bucketName: string,
  idPoolId: string
) => {
  const iamPolicy = new iam.PolicyDocument({
    statements: [
      new iam.PolicyStatement({
        effect: iam.Effect.DENY,
        actions: ["s3:ListBucket"],
        resources: [`arn:aws:s3:::${bucketName}`],
      }),
      new iam.PolicyStatement({
        effect: iam.Effect.DENY,
        actions: ["s3:GetObject"],
        resources: [`arn:aws:s3:::${bucketName}/*`],
      }),
    ],
  });

  const iamRole = new iam.Role(scope, "unauthenticatedNote3Role", {
    assumedBy: new iam.FederatedPrincipal(
      "cognito-identity.amazonaws.com",
      {
        StringEquals: {
          "cognito-identity.amazonaws.com:aud": idPoolId,
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "unauthenticated",
        },
      },
      "sts:AssumeRoleWithWebIdentity"
    ),
    inlinePolicies: {
      [`unauthenticated${env}Note3S3`]: iamPolicy,
    },
    roleName: `Unauthenticated${env}Note3RoleForAuthedUser`,
  });

  return {
    iamRole,
  };
};

export const makeNote3LambdaEdgeIamRole = (scope: Construct, env: string) => {
  const iamPolicy = new iam.PolicyDocument({
    statements: [
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        resources: ["arn:aws:logs:*:*:*"],
      }),
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "lambda:GetFunction",
          "lambda:EnableReplication*",
          "iam:CreateServiceLinkedRole",
          "cloudfront:CreateDistribution",
          "cloudfront:UpdateDistribution",
        ],
        resources: [`*`],
      }),
    ],
  });

  const iamRole = new iam.Role(scope, `${env}Note3LambdaEdgeRole`, {
    assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    inlinePolicies: {
      [`${env}Note3LambdaEdgePolicy`]: iamPolicy,
    },
    roleName: `${env}Note3LambdaEdgeRole`,
  });

  return {
    iamRole,
  };
};
