import S3 from "ibm-cos-sdk/clients/s3.js";
import dotenv from 'dotenv';

dotenv.config();

var config = {
    endpoint: 's3.jp-tok.cloud-object-storage.appdomain.cloud',
    apiKeyId: process.env.KEY_ID,
    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/dbad7cc0c6a642f892afdcb81fac6df4:3bf9d86f-811f-480b-af51-ab1401c5e643::',
    signatureVersion: 'iam',
    region:"jp-tok"
};

var cos = new S3(config);

export default {cos}