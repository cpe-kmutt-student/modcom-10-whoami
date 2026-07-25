import { config } from "@repo/config";
import { transporter } from "./transporter";

export async function sender(to: string, subject: string, html: string) {
	const info = await transporter.sendMail({
		from: config.backend.email.from,
		to: to,
		subject: subject,
		html: html,
	});

	console.log(`Email sent to ${to} (MsgID: ${info.messageId})`);
	return { success: true, messageId: info.messageId };
}
