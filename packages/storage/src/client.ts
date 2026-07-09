import { S3Client } from "@aws-sdk/client-s3";
import { config } from "@repo/config";

export const s3 = new S3Client({
	region: config.backend.s3.region,
	endpoint: config.backend.s3.endpoint,
	credentials: {
		accessKeyId: config.backend.s3.accessKey,
		secretAccessKey: config.backend.s3.secretKey,
	},
	forcePathStyle: true, // IMPORTANT for S3-Complatible
});
