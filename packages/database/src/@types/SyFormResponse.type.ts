export type ISyFormResponse = FormResponse[];

export interface FormResponse {
	timestamp: string;
	studentId: string;
	nickname: string;
	contactChannel: string;
	profileImage: string;
	hint1: string;
	hint2: string;
	hint3: string;
	contactDetails: string;
	email: string;
	consent: string;
	score: string;
}
