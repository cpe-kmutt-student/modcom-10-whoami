import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "@repo/config";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ["log", "error", "warn", "debug", "verbose"],
		bodyParser: false,
	});

	app.enableCors({
		origin: config.backend.allowOrigins,
		credentials: true,
	});

	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());
	app.use(cookieParser());
	app.use(morgan("dev"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.getHttpAdapter().getInstance().set("trust proxy", 1);

	if (config.nodeEnv === "development") {
		app.setGlobalPrefix("api");
	}

	await app.listen(config.backend.port);
}
bootstrap();
