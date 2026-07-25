import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./client";
import { config } from "@repo/config";

export async function uploadFile(bucket: string, key: string, body: Buffer | Uint8Array | string, contentType?: string) {
	await s3.send(
		new PutObjectCommand({
			Bucket: bucket,
			Key: key,
			Body: body,
			ContentType: contentType,
		}),
	);
}
