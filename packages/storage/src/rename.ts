import {
	CopyObjectCommand,
	DeleteObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { s3 } from "./client";

export async function renameFile(
	bucket: string,
	oldKey: string,
	newKey: string,
) {
	await s3.send(
		new CopyObjectCommand({
			Bucket: bucket,
			CopySource: `${bucket}/${encodeURIComponent(oldKey)}`,
			Key: newKey,
		}),
	);

	// Delete old
	await s3.send(
		new DeleteObjectCommand({
			Bucket: bucket,
			Key: oldKey,
		}),
	);
}
