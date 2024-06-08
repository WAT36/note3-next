#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FrontendStack } from "../lib/stack/frontend-stack";
import { AuthStack } from "../lib/stack/auth-stack";
import { DnsStack } from "../lib/stack/dns-stack";
import { CertificateStack } from "../lib/stack/certificate-stack";
import { DistributionStack } from "../lib/stack/distribution-stack";

const app = new cdk.App();
const env = app.node.tryGetContext("env") || "dev";

// DNS hostzone
const dnsStack = new DnsStack(app, `${env}Note3DnsStack`, {
  env,
});

const certificateStack = new CertificateStack(
  app,
  `${env}Note3CertificateStack`,
  {
    env,
    hostedZone: dnsStack.hostedZone,
  }
);

// S3
const frontendStack = new FrontendStack(app, `${env}Note3FrontendStack`, {
  env,
});

// cognito
const authStack = new AuthStack(app, `${env}Note3AuthStack`, {
  env,
  s3Bucket: frontendStack.s3Bucket,
});

// cloudfront
const distributionStack = new DistributionStack(
  app,
  `${env}Note3DistributionStack`,
  {
    env,
    s3Bucket: frontendStack.s3Bucket,
    frontCertificate: certificateStack.note3Certificate,
    hostedZone: dnsStack.hostedZone,
  }
);

certificateStack.addDependency(dnsStack);
authStack.addDependency(frontendStack);
distributionStack.addDependency(frontendStack);
distributionStack.addDependency(certificateStack);
