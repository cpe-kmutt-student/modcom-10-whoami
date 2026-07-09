import { render } from "@react-email/render";
import { sender } from "./sender";
import HintNotificationEmail from "./templates/HintNotificationEmail";

export async function sendHintNotification(
	email: string,
	name: string,
	hint: string,
) {
	try {
		const html = await render(
			HintNotificationEmail({
				menteeName: name,
				hint: hint,
				url: "https://comcamp.io",
			}),
		);
		return await sender(email, "🔍 ใบ้ใหม่จากพี่รหัสมาเเล้ว มาตามหาพี่ๆ กันเถอะ", html);
	} catch (e) {
		console.log("Send email error: ", e);
	}
}
