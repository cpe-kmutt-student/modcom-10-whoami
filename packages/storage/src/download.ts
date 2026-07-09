import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./client";

export async function downloadFile(bucket: string, key: string) {
	return await s3.send(
		new GetObjectCommand({
			Bucket: bucket,
			Key: key,
		}),
	);
}
