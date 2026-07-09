import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import type { PrismaPg } from "@prisma/adapter-pg";
import { config } from "@repo/config";
import type { IFirstYear } from "./@types/firstYear.type";
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
				path.join(process.cwd(), "/src/seed/69_HDS.json"),
				"utf8",
			);
			const loadInter69 = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/69_Inter.json"),
				"utf8",
			);
			const loadRegular69 = fs.readFileSync(
				path.join(process.cwd(), "/src/seed/69_Regular.json"),
				"utf8",
			);

			this.hds_68 = JSON.parse(loadHDS68);
			this.inter_68 = JSON.parse(loadInter68);
			this.regular_68 = JSON.parse(loadRegular68);
			this.hds_69 = JSON.parse(loadHDS69);
			this.inter_69 = JSON.parse(loadInter69);
			this.regular_69 = JSON.parse(loadRegular69);
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
}

// Run seed
const prismaSeed = new PrismaSeed(prisma, adapter);
prismaSeed.seedUser69();
prismaSeed.seedUser68();
