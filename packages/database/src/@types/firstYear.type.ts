export type IFirstYear = FirstYear[];

export interface FirstYear {
	id: string;
	displayName: string;
	userPrincipalName: string;
	userType: string;
	onPremisesSyncEnabled: string;
	identities: Identity[];
	companyName: string;
	creationType: string;
	onPremisesSamAccountName: number;
	givenName: string;
	surname: string;
}

export interface Identity {
	signInType: string;
	issuer: string;
	issuerAssignedId: string;
}
