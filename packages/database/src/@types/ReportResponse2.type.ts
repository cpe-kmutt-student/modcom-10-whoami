export type ReportResponse2 = Response[];

export interface Response {
	timestamp: string;
	studentId: string;
	nickname: string;
	hint2: string;
	hint3: string;
	consent: string;
}
