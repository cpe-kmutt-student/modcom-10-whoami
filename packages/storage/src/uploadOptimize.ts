import { PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "@repo/config";
import sharp from "sharp";
import { s3 } from "./client";

export async function uploadFileOptimize(
	bucket: string,
	key: string,
	body: Buffer | Uint8Array | string,
) {
	const processedBuffer = await sharp(body).webp().toBuffer();

	await s3.send(
		new PutObjectCommand({
			Bucket: bucket,
			Key: key,
			Body: processedBuffer,
			ContentType: "image/webp",
		}),
	);
}
