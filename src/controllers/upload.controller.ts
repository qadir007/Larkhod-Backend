import httpStatus from "http-status";
import { s3BucketService } from "../services";
import catchAsync from "../utils/catchAsync";

const getFileUploadUrl = catchAsync(async (req, res) => {
  try {
    const { path, fileFormat, contentType } = req.body;

    const filePath = `${path}/${Date.now()}.${fileFormat}`;
    const putUrl = await s3BucketService.getPutSignedUrl(filePath, contentType);
    const getUrl = await s3BucketService.getSignedObjectUrl(filePath);

    return res.status(httpStatus.OK).send({ path: filePath, putUrl, getUrl });
  } catch (error) {
    console.log(error);
  }
});

export default {
  getFileUploadUrl,
};
