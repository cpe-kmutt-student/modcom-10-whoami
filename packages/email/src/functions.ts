import { render } from "@react-email/render";
import { sender } from "./sender";
import HintNotificationEmail from "./templates/HintNotificationEmail";
import { contents } from "./templates/Mirror/contents/contents";
import MirrorEmailTemplate from "./templates/Mirror/MirrorEmailTemplate";

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
				url: "https://whoami.cpesu.com/hint",
			}),
		);
		return await sender(email, "🔍 ใบ้ใหม่จากพี่รหัสมาเเล้ว มาตามหาพี่ๆ กันเถอะ", html);
	} catch (e) {
		console.log("Send email error: ", e);
	}
}

export async function sendMirrorEmail() {
	try {
		for (const content of contents) {
			const html = await render(
				MirrorEmailTemplate({
					nickname: content.reciever,
					contents: content.contents,
				}),
			);
			return await sender("email", "🔍 ใคือไรน้าาาา ลองเปิดดูสิ อิอิ", html);
		}
	} catch (e) {
		console.log("Send email error: ", e);
	}
}
