export type HDSMapType = Root1[];

export interface Root1 {
	senior_id: string;
	senior_info: SeniorInfo1;
	juniors: Junior1[];
}

export interface SeniorInfo1 {
	name: string;
	nickname: string;
}

export interface Junior1 {
	id: string;
	name: string;
	nickname: string;
}

export type InterMapType = Root2[];

export interface Root2 {
	senior_id: string;
	senior_info: SeniorInfo2;
	juniors: Junior2[];
}

export interface SeniorInfo2 {
	name: string;
	nickname: string;
}

export interface Junior2 {
	id?: string;
	name?: string;
	nickname?: string;
	note?: string;
}

export type RegMapType = Root3[];

export interface Root3 {
	senior_id: string;
	senior_info: SeniorInfo3;
	juniors: Junior3[];
}

export interface SeniorInfo3 {
	name: string;
	nickname: string;
}

export interface Junior3 {
	id?: string;
	name?: string;
	nickname?: string;
	note?: string;
}
