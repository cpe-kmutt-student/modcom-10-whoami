import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "./client";

export async function getPreSignUrl(bucket: string, key: string, expiresIn = 30 * 60): Promise<string> {
	return await getSignedUrl(
		s3,
		new GetObjectCommand({
			Bucket: bucket,
			Key: key,
		}),
		{
			expiresIn,
		},
	);
}
