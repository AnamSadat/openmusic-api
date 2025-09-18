import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from '../../utils/config.js';

class StorageCloudService {
  constructor() {
    this._S3 = new S3Client({
      region: config.aws.s3.region,
      credentials: {
        accessKeyId: config.aws.s3.accessKeyId,
        secretAccessKey: config.aws.s3.secretAccessKey,
      },
    });
  }

  async writeFile(file, meta) {
    const parameter = new PutObjectCommand({
      Bucket: config.aws.s3.bucket,
      Key: meta.filename,
      Body: file._data,
      ContentType: meta.headers['content-type'],
    });

    await this._S3.send(parameter);

    return this.createPreSignedUrl({
      bucket: config.aws.s3.bucket,
      key: meta.filename,
    });
  }

  createPreSignedUrl({ bucket, key }) {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    return getSignedUrl(this._S3, command, { expiresIn: 3600 });
  }
}

export default StorageCloudService;
