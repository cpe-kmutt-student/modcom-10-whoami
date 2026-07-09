import { config } from "@repo/config";
import * as nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	host: config.backend.email.host,
	port: config.backend.email.port,
	secure: config.backend.email.secure,
	auth: {
		user: config.backend.email.user,
		pass: config.backend.email.password,
	},
});
