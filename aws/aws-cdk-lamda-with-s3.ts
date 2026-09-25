/*
// lib/my-cdk-app-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class MyCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const uploadBucket = new s3.Bucket(this, 'UploadBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,

      encryption: s3.BucketEncryption.S3_MANAGED,

      removalPolicy: cdk.RemovalPolicy.DESTROY,

      autoDeleteObjects: true,
    });

    // Create Lambda
    const uploadLambda = new lambda.Function(this, 'UploadLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,

      handler: 'index.handler',

      code: lambda.Code.fromAsset(
        path.join(__dirname, '../lambda')
      ),

      environment: {
        BUCKET_NAME: uploadBucket.bucketName,
      },
    });

    // Give Lambda permission to upload files to S3
    uploadBucket.grantPut(uploadLambda);

    // Output bucket name
    new cdk.CfnOutput(this, 'UploadBucketName', {
      value: uploadBucket.bucketName,
    });
  }
}

// we can create a seperate lamda project and import it here as it is a good practice to keep the lambda code separate from the CDK code.
// This way, we can manage the lambda code independently and also use different languages or frameworks for the lambda function if needed.

// src/services/s3.service.ts

import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({});

export async function uploadToS3(
  bucketName: string,
  key: string,
  body: Buffer,
  contentType: string
) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  return s3.send(command);
}

// Create Lambda handler: src/handlers/uploadFile.ts

import { uploadToS3 } from "../services/s3.service";

export const handler = async (event: any) => {
  try {
    const bucketName = process.env.BUCKET_NAME;

    if (!bucketName) {
      throw new Error("BUCKET_NAME is missing");
    }

    const body = Buffer.from(
      event.body,
      event.isBase64Encoded ? "base64" : "utf8"
    );

    const fileName = event.queryStringParameters?.fileName
      || `file-${Date.now()}.txt`;

    await uploadToS3(
      bucketName,
      `uploads/${fileName}`,
      body,
      event.headers?.["content-type"] || "application/octet-stream"
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "File uploaded successfully",
        fileName,
      }),
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "File upload failed",
      }),
    };
  }
};
*/

// Your CDK project structure should look like this:
/*
infrastructure/
│
├── bin/
│   └── infrastructure.ts
│
├── lib/
│   └── infrastructure-stack.ts
│
├── package.json
└── cdk.json

import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export class InfrastructureStack extends cdk.Stack {

  constructor(
    scope: Construct,
    id: string,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    // S3 bucket
    const uploadBucket = new s3.Bucket(
      this,
      "UploadBucket",
      {
        blockPublicAccess:
          s3.BlockPublicAccess.BLOCK_ALL,

        encryption:
          s3.BucketEncryption.S3_MANAGED,

        removalPolicy:
          cdk.RemovalPolicy.DESTROY,

        autoDeleteObjects: true,
      }
    );

    // Lambda from separate project
    const uploadLambda =
      new lambdaNodejs.NodejsFunction(
        this,
        "UploadFileLambda",
        {
          runtime:
            lambda.Runtime.NODEJS_20_X,

          entry: path.join(
            __dirname,
            "../../lambda-service/src/handlers/uploadFile.ts"
          ),

          handler: "handler",

          environment: {
            BUCKET_NAME:
              uploadBucket.bucketName,
          },
        }
      );

    // Give Lambda permission to upload
    uploadBucket.grantPut(uploadLambda);
  }
}
*/