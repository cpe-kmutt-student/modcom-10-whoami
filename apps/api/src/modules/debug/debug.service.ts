import { Injectable } from "@nestjs/common";
import { config } from "@repo/config";

@Injectable()
export class DebugService {
	getConfigDebug() {
		return {
			env: config.nodeEnv,
			database: !!config.backend.databaseUrl,
			cors: config.backend.allowOrigins,
			domain: config.backend.domain,
			authSecret: !!config.backend.betterAuth.secret,
			baseUrl: config.backend.betterAuth.baseUrl,

			msId: !!config.backend.betterAuth.microsoft.clientId,
			msSecret: !!config.backend.betterAuth.microsoft.clientSecret,
			msTenant: !!config.backend.betterAuth.microsoft.tenantId,

			period: config.backend.period,
			s3: {
				region: config.backend.s3.region,
				endpoint: config.backend.s3.endpoint,
				accessKey: !!config.backend.s3.accessKey,
				secretKey: !!config.backend.s3.secretKey,
				bucket: config.backend.s3.bucket,
			},
		};
	}
}
