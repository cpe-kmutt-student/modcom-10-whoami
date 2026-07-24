import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import type { PrismaPg } from "@prisma/adapter-pg";
import { config } from "@repo/config";
import type { IFirstYear } from "./@types/firstYear.type";
import type {
	HDSMapType,
	InterMapType,
	RegMapType,
} from "./@types/MapFySy.type";
import type { ReportResponse } from "./@types/ReportResponse.type";
import type { ISyFormResponse } from "./@types/SyFormResponse.type";
import {
	adapter,
	type ContactPlatform,
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
	private hds_fysy_map: HDSMapType = [];
	private inter_fysy_map: InterMapType = [];
	private reg_fysy_map: RegMapType = [];

	private sy_form_response: ISyFormResponse = [];

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

			const loadFySyMapHDS = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/hds_mentor_mapping_array.json"),
				"utf8",
			);

			const loadFySyMapInter = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/inter_mentor_mapping_array.json"),
				"utf8",
			);

			const loadFySyMapReg = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/reg_mentor_mapping_array.json"),
				"utf8",
			);

			const loadSyFormResponse = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/sy_form_response.json"),
				"utf8",
			);

			this.hds_68 = JSON.parse(loadHDS68);
			this.inter_68 = JSON.parse(loadInter68);
			this.regular_68 = JSON.parse(loadRegular68);
			this.hds_69 = JSON.parse(loadHDS69);
			this.inter_69 = JSON.parse(loadInter69);
			this.regular_69 = JSON.parse(loadRegular69);
			this.report_res = JSON.parse(loadReportRes);

			this.hds_fysy_map = JSON.parse(loadFySyMapHDS);
			this.inter_fysy_map = JSON.parse(loadFySyMapInter);
			this.reg_fysy_map = JSON.parse(loadFySyMapReg);

			this.sy_form_response = JSON.parse(loadSyFormResponse);
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

	async deleteMapFySy() {
		try {
			const deleteMap =
				await prisma.firstYearUserAndSecondYearUserJoiner.deleteMany();
			console.log(deleteMap);
		} catch (e) {
			console.log(e);
		}
	}

	async seedMapFySyHDS() {
		try {
			for (const hdsSy of this.hds_fysy_map) {
				const syUserId = hdsSy.senior_id;
				for (const hdsFy of hdsSy.juniors) {
					const createJoiner =
						await prisma.firstYearUserAndSecondYearUserJoiner.create({
							data: {
								syuser_id: syUserId,
								fyuser_id: hdsFy.id,
							},
						});
					console.log(createJoiner);
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	async seedMapFySyInter() {
		try {
			for (const interSy of this.inter_fysy_map) {
				const syUserId = interSy.senior_id;
				for (const interFy of interSy.juniors) {
					if (!interFy.id) break;
					const createJoiner =
						await prisma.firstYearUserAndSecondYearUserJoiner.create({
							data: {
								syuser_id: syUserId,
								fyuser_id: interFy.id,
							},
						});
					console.log(createJoiner);
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	async seedMapFySyReg() {
		try {
			for (const regSy of this.reg_fysy_map) {
				const syUserId = regSy.senior_id;
				for (const regFy of regSy.juniors) {
					if (!regFy.id) break;
					const createJoiner =
						await prisma.firstYearUserAndSecondYearUserJoiner.create({
							data: {
								syuser_id: syUserId,
								fyuser_id: regFy.id,
							},
						});
					console.log(createJoiner);
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	async seedSyNickName() {
		try {
			const getUserNoNickname = await prisma.secondYearUser.findMany({
				where: {
					syuser_nickname: "***",
				},
			});

			let totalSuccess = 0;
			const total = getUserNoNickname.length;

			for (const syUser of getUserNoNickname) {
				const findMatchUserId = this.sy_form_response.find(
					(f) => f.studentId === syUser.syuser_id,
				);
				if (!findMatchUserId) continue;
				await prisma.secondYearUser.update({
					where: {
						syuser_id: syUser.syuser_id,
					},
					data: {
						syuser_nickname: findMatchUserId.nickname,
					},
				});

				totalSuccess++;
			}

			console.log(`Success : ${totalSuccess} / ${total}`);
		} catch (e) {
			console.log(e);
		}
	}

	async seedSyProfileImage() {
		try {
			const getUserNoProfile = await prisma.secondYearUser.findMany({
				where: {
					syuser_profile_key: "default_user_profile.png",
				},
			});

			let totalSuccess = 0;
			const total = getUserNoProfile.length;

			for (const syUser of getUserNoProfile) {
				const findMatchUserId = this.sy_form_response.find(
					(f) => f.studentId === syUser.syuser_id,
				);
				if (!findMatchUserId) continue;
				await prisma.secondYearUser.update({
					where: {
						syuser_id: syUser.syuser_id,
					},
					data: {
						syuser_profile_key: findMatchUserId.profileImage,
					},
				});

				totalSuccess++;
			}

			console.log(`Success : ${totalSuccess} / ${total}`);
		} catch (e) {
			console.log(e);
		}
	}

	async seedSyContact() {
		try {
			const getUserNoContact = await prisma.secondYearUser.findMany({
				where: {
					sycontact: {
						none: {},
					},
				},
			});

			let totalSuccess = 0;
			let totalSkip = 0;
			const total = getUserNoContact.length;

			for (const syUser of getUserNoContact) {
				const findMatchUserId = this.sy_form_response.find(
					(f) => f.studentId === syUser.syuser_id,
				);
				if (!findMatchUserId) {
					totalSkip++;
					continue;
				}

				let channel: ContactPlatform = "other";
				if (findMatchUserId.contactChannel === "Instagram") {
					channel = "instagram";
				} else if (findMatchUserId.contactChannel === "LINE ID") {
					channel = "line";
				} else if (findMatchUserId.contactChannel === "Discord") {
					channel = "discord";
				} else if (findMatchUserId.contactChannel === "Facebook") {
					channel = "facebook";
				}

				await prisma.secondYearContact.create({
					data: {
						syuser_id: findMatchUserId.studentId,
						sycontact_platform: channel,
						sycontact_detail: findMatchUserId.contactDetails,
					},
				});

				totalSuccess++;
			}

			console.log(`Total skip : ${totalSkip}`);
			console.log(`Success : ${totalSuccess} / ${total}`);
		} catch (e) {
			console.log(e);
		}
	}

	async seedFyHint1() {
		try {
			const getFyUser = await prisma.firstYearUser.findMany({
				include: {
					fyquest: true,
					syuser: {
						include: {
							syuser: true,
						},
					},
				},
			});
			const fyUserNoHint = getFyUser.filter(
				(f) => !f.fyquest.find((q) => q.fyquest_index === 1),
			);

			let totalSuccess = 0;
			let totalSkip = 0;
			const total = fyUserNoHint.length;

			for (const fyUser of fyUserNoHint) {
				const pRaHud = fyUser.syuser[0]?.syuser_id;

				const getPrahudHint = this.sy_form_response.find(
					(sy) => sy.studentId === pRaHud,
				);

				if (!getPrahudHint) {
					totalSkip++;
					continue;
				}

				const createHint = await prisma.firstYearQuest.create({
					data: {
						fyuser_id: fyUser.fyuser_id,
						fyquest_index: 1,
						fyquest_detail: getPrahudHint.hint1,
					},
				});

				totalSuccess++;
			}

			console.log(`Total skip : ${totalSkip}`);
			console.log(`Success : ${totalSuccess} / ${total}`);
		} catch (e) {
			console.log(e);
		}
	}

	async seedGetFyNoHint() {
		try {
			const getFyNoHint = await prisma.firstYearUser.findMany({
				where: {
					fyquest: {
						none: {},
					},
				},
				select: {
					fyuser_id: true,
					syuser: {
						select: {
							syuser: {
								select: {
									syuser_nickname: true,
								},
							},
						},
					},
				},
			});

			console.table(getFyNoHint);
		} catch (e) {
			console.log(e);
		}
	}
}

// Run seed
const prismaSeed = new PrismaSeed(prisma, adapter);
// prismaSeed.seedSyNickName();
// prismaSeed.seedSyProfileImage();
// prismaSeed.seedSyContact();
// prismaSeed.seedFyHint1();

prismaSeed.seedGetFyNoHint();

// prismaSeed.seedMapFySyReg();
// prismaSeed.deleteMapFySy();
// prismaSeed.seedMapFySyHDS();
// prismaSeed.seedMapFySyInter();
// prismaSeed.seedUser69();
// prismaSeed.seedUser68();
// prismaSeed.seedMapJuniorAndSenior();
// prismaSeed.checkTotalSeniorNoJunior();
// prismaSeed.seedContact();
