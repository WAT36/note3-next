import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import * as dotenv from "dotenv";

dotenv.config();

type FrontendStackProps = {
  env: string;
};

export class FrontendStack extends cdk.Stack {
  readonly s3Bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, {
      env: { region: process.env.REGION || "" },
      crossRegionReferences: true,
    });

    const { region, accountId } = new cdk.ScopedAws(this);

    // S3 Bucket
    this.s3Bucket = new s3.Bucket(this, `${props.env}WatNote3FrontBucket`, {
      bucketName: `${props.env}-wat-note3-bucket`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
          exposedHeaders: [],
        },
      ],
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
