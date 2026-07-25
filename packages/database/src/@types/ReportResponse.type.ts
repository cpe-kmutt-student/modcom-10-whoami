export type ReportResponse = Response[];

export interface Response {
	timestamp: string;
	student_id: number;
	nickname: string;
	contact_info_old: any;
	playful_photo: string;
	clue_1: string;
	clue_2: any;
	clue_3: any;
	confirmation: string;
	email: any;
	score: any;
	contact_platform: string;
	contact_details: string;
	extra_column_1: any;
}
