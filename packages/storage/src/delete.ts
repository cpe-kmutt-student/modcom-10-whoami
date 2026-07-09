import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./client";

export async function deleteFile(bucket: string, key: string) {
	return await s3.send(
		new DeleteObjectCommand({
			Bucket: bucket,
			Key: key,
		}),
	);
}
