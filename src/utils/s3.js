import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import aroundConfig from "../config/default.js";
import fs from "fs";
const region = aroundConfig.awsRegionBucket;
const accessKeyId = aroundConfig.accesKeyId;
const secretAccessKey = aroundConfig.accesKeySecret;

const storage = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const getFiles = async (nameBucke, name) => {
  const urls = `https://${nameBucke}.s3.${region}.amazonaws.com/${name}`;
  return urls;
};

const uploadBucket = async (bucketName, file) => {
  const stream = fs.createReadStream(file.tempFilePath);
  const params = {
    Bucket: bucketName,
    Key: file.name,
    Body: stream,
  };
  const comand = new PutObjectCommand(params);
  await storage.send(comand);
  let x = await getFiles(bucketName, file.name);
  return x;
};

export default uploadBucket;
