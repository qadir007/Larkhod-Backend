import superagent from "superagent";
import AWS from "aws-sdk";
import config from "../config/config";

const S3 = new AWS.S3(config.aws.credentials);

const signedUrlExpireSeconds = 60 * 500;

const getPutSignedUrl = async (
  fileFullPath: string,
  contentType: string,
  expireInSeconds: number = signedUrlExpireSeconds
) => {
  try {
    const params = {
      Key: `${fileFullPath}`,
      Expires: expireInSeconds,
      ContentType: `${contentType}`,
      Bucket: config.aws.bucketName,
    };

    const url = await S3.getSignedUrlPromise("putObject", params);
    return Promise.resolve(url);
  } catch (err) {
    return Promise.reject(err);
  }
};

const uploadFile = async (
  fileFullPath: string,
  stream: Buffer,
  contentType = `text/csv`
) => {
  try {
    const signedUrl = await getPutSignedUrl(fileFullPath, contentType);

    const response = await superagent
      .put(signedUrl)
      .set("Content-Type", "application/octet-stream")
      .send(stream);

    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const upload = async (signedUrl: string, stream: Buffer) => {
  try {
    const response = await superagent
      .put(signedUrl)
      .set("Content-Type", "application/octet-stream")
      .send(stream);
    return Promise.resolve(response);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const getSignedObjectUrl = async (
  filePath: string,
  expireInSeconds: number = signedUrlExpireSeconds
) => {
  try {
    const params = {
      Key: `${filePath}`,
      Expires: expireInSeconds,
      Bucket: config.aws.bucketName,
    };

    return Promise.resolve(await S3.getSignedUrlPromise("getObject", params));
  } catch (err) {
    return Promise.reject(err);
  }
};

export default { getPutSignedUrl, getSignedObjectUrl, upload, uploadFile };
