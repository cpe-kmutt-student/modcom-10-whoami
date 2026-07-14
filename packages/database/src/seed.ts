import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import type { PrismaPg } from "@prisma/adapter-pg";
import { config } from "@repo/config";
import type { IFirstYear } from "./@types/firstYear.type";
import type { ReportResponse } from "./@types/ReportResponse.type";
import {
	adapter,
	FirstYearUser,
	type PrismaClient,
	prisma,
	SecondYearUser,
} from "./client";

class PrismaSeed {
	private readonly adapter: PrismaPg;
	private readonly prisma: PrismaClient;

	private hds_68: IFirstYear = [];
	private inter_68: IFirstYear = [];
	private regular_68: IFirstYear = [];
	private hds_69: IFirstYear = [];
	private inter_69: IFirstYear = [];
	private regular_69: IFirstYear = [];

	private report_res: ReportResponse = [];

	constructor(prisma: PrismaClient, adapter: PrismaPg) {
		this.adapter = adapter;
		this.prisma = prisma;
		this.loadData();
	}

	async loadData() {
		try {
			const loadHDS68 = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/68_HDS.json"),
				"utf8",
			);
			const loadInter68 = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/68_Inter.json"),
				"utf8",
			);
			const loadRegular68 = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/68_Regular.json"),
				"utf8",
			);
			const loadHDS69 = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/hds_new_69.json"),
				"utf8",
			);
			const loadInter69 = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/inter_new_69.json"),
				"utf8",
			);
			const loadRegular69 = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/reg_new_69.json"),
				"utf8",
			);

			const loadReportRes = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/report_response.json"),
				"utf8",
			);

			this.hds_68 = JSON.parse(loadHDS68);
			this.inter_68 = JSON.parse(loadInter68);
			this.regular_68 = JSON.parse(loadRegular68);
			this.hds_69 = JSON.parse(loadHDS69);
			this.inter_69 = JSON.parse(loadInter69);
			this.regular_69 = JSON.parse(loadRegular69);
			this.report_res = JSON.parse(loadReportRes);
		} catch (e) {
			console.log(e);
		}
	}

	async seedUser69() {
		try {
			// seeding Regular
			const insertRegularFy = await this.prisma.firstYearUser.createMany({
				data: this.regular_69.map((r) => {
					return {
						fyuser_uuid: r.id,
						fyuser_email: r.userPrincipalName,
						fyuser_id: String(r.onPremisesSamAccountName),
						fyuser_firstname: r.givenName,
						fyuser_lastname: r.surname,
					};
				}),
				skipDuplicates: true,
			});
			console.log("Created: 69 Regular, Total:", insertRegularFy.count);

			// seeding Inter
			const insertInterFy = await this.prisma.firstYearUser.createMany({
				data: this.inter_69.map((r) => {
					return {
						fyuser_uuid: r.id,
						fyuser_email: r.userPrincipalName,
						fyuser_id: String(r.onPremisesSamAccountName),
						fyuser_firstname: r.givenName,
						fyuser_lastname: r.surname,
					};
				}),
				skipDuplicates: true,
			});
			console.log("Created: 69 Inter, Total:", insertInterFy.count);

			// seeding HDS
			const insertHDSFy = await this.prisma.firstYearUser.createMany({
				data: this.hds_69.map((r) => {
					return {
						fyuser_uuid: r.id,
						fyuser_email: r.userPrincipalName,
						fyuser_id: String(r.onPremisesSamAccountName),
						fyuser_firstname: r.givenName,
						fyuser_lastname: r.surname,
					};
				}),
				skipDuplicates: true,
			});
			console.log("Created: 69 HDS, Total:", insertHDSFy.count);
		} catch (e) {
			console.log(e);
		}
	}

	async seedUser68() {
		try {
			// seeding Regular
			const insertRegularFy = await this.prisma.secondYearUser.createMany({
				data: this.regular_68.map((r) => {
					return {
						syuser_uuid: r.id,
						syuser_nickname: "asd",
						syuser_profile_key: "default_user_profile.png",
						syuser_email: r.userPrincipalName,
						syuser_id: String(r.onPremisesSamAccountName),
						syuser_firstname: r.givenName,
						syuser_lastname: r.surname,
					};
				}),
				skipDuplicates: true,
			});
			console.log("Created: 69 Regular, Total:", insertRegularFy.count);

			// seeding Inter
			const insertInterFy = await this.prisma.secondYearUser.createMany({
				data: this.inter_68.map((r) => {
					return {
						syuser_uuid: r.id,
						syuser_nickname: "asd",
						syuser_profile_key: "default_user_profile.png",
						syuser_email: r.userPrincipalName,
						syuser_id: String(r.onPremisesSamAccountName),
						syuser_firstname: r.givenName,
						syuser_lastname: r.surname,
					};
				}),
				skipDuplicates: true,
			});
			console.log("Created: 69 Inter, Total:", insertInterFy.count);

			// seeding HDS
			const insertHDSFy = await this.prisma.secondYearUser.createMany({
				data: this.hds_68.map((r) => {
					return {
						syuser_uuid: r.id,
						syuser_nickname: "asd",
						syuser_profile_key: "default_user_profile.png",
						syuser_email: r.userPrincipalName,
						syuser_id: String(r.onPremisesSamAccountName),
						syuser_firstname: r.givenName,
						syuser_lastname: r.surname,
					};
				}),
				skipDuplicates: true,
			});
			console.log("Created: 69 HDS, Total:", insertHDSFy.count);
		} catch (e) {
			console.log(e);
		}
	}

	async seedNicknameAndProfile() {
		try {
			for (const reportRes of this.report_res) {
				const insert = await prisma.secondYearUser.updateMany({
					where: {
						syuser_id: String(reportRes.student_id),
					},
					data: {
						syuser_nickname: reportRes.nickname,
						syuser_profile_key: reportRes.playful_photo,
					},
				});
			}
			console.log("Update nickname and profile success");
		} catch (e) {
			console.log(e);
		}
	}

	async seedContact() {
		try {
			for (const reportRes of this.report_res) {
				if (reportRes.contact_platform === "Discord") {
					const insert = await prisma.secondYearContact.create({
						data: {
							syuser_id: String(reportRes.student_id),
							sycontact_platform: "discord",
							sycontact_detail: reportRes.contact_details,
						},
					});
				} else if (reportRes.contact_platform === "Facebook") {
					const insert = await prisma.secondYearContact.create({
						data: {
							syuser_id: String(reportRes.student_id),
							sycontact_platform: "facebook",
							sycontact_detail: reportRes.contact_details,
						},
					});
				} else if (reportRes.contact_platform === "Instagram") {
					const insert = await prisma.secondYearContact.create({
						data: {
							syuser_id: String(reportRes.student_id),
							sycontact_platform: "instagram",
							sycontact_detail: reportRes.contact_details,
						},
					});
				} else if (reportRes.contact_platform === "LINE ID") {
					const insert = await prisma.secondYearContact.create({
						data: {
							syuser_id: String(reportRes.student_id),
							sycontact_platform: "line",
							sycontact_detail: reportRes.contact_details,
						},
					});
				}
			}
			console.log("Create contact success");
		} catch (e) {
			console.log(e);
		}
	}

	async seedMapJuniorAndSenior() {
		try {
			// clear db
			await prisma.firstYearUserAndSecondYearUserJoiner.deleteMany();

			// get 69 user
			const getAvailableJunior = await prisma.firstYearUser.findMany({
				where: {
					fyuser_id: {
						startsWith: "69",
					},
				},
			});

			const totalMatch = [];
			const totalMissing = [];

			// check with 68 user if match
			for (const { fyuser_id } of getAvailableJunior) {
				const last4digit = fyuser_id.slice(-4);
				const getAvailableSenior = await prisma.secondYearUser.findMany({
					where: {
						syuser_id: {
							endsWith: last4digit,
						},
					},
				});
				if (getAvailableSenior.length === 0) {
					totalMissing.push(fyuser_id);
					continue;
				}

				const createJoiner =
					await prisma.firstYearUserAndSecondYearUserJoiner.create({
						data: {
							fyuser_id: fyuser_id,
							syuser_id: getAvailableSenior[0]!.syuser_id,
						},
					});
				totalMatch.push(fyuser_id);
			}

			console.log(totalMatch.length);
			console.log(totalMissing);
		} catch (e) {
			console.log(e);
		}
	}

	async checkTotalSeniorNoJunior() {
		try {
			const getAvailableSenior = await prisma.secondYearUser.findMany({
				where: {
					syuser_id: {
						startsWith: "68",
					},
				},
			});

			const totalMissing = [];
			for (const { syuser_id } of getAvailableSenior) {
				const last4digit = syuser_id.slice(-4);
				const getAvailableJunior = await prisma.firstYearUser.findMany({
					where: {
						fyuser_id: {
							endsWith: last4digit,
						},
					},
				});

				if (getAvailableJunior.length === 0) {
					totalMissing.push(syuser_id);
				}
			}

			console.log(totalMissing);
		} catch (e) {
			console.log(e);
		}
	}

	async seedHint1() {
		try {
			for (const reportRes of this.report_res) {
				const getHint1Cache = await prisma.firstYearQuest.findMany({
					where: {
						fyquest_index: 1,
						fyuser_id: String(reportRes.student_id),
					},
				});
				if (getHint1Cache.length !== 0) {
					continue;
				}

				const createHint = await prisma.firstYearQuest.createMany({
					data: {
						fyuser_id: "",
						fyquest_index: 1,
						fyquest_detail: "",
					},
				});
			}
			console.log("Create Hint 1 success");
		} catch (e) {
			console.log(e);
		}
	}
}

// Run seed
const prismaSeed = new PrismaSeed(prisma, adapter);
// prismaSeed.seedUser69();
// prismaSeed.seedUser68();
// prismaSeed.seedMapJuniorAndSenior();
prismaSeed.checkTotalSeniorNoJunior();
// prismaSeed.seedContact();
