/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import {
  ApplicationReadiness,
  initWinston,
  loadApiConfiguration,
  loadDatabaseApiConfiguration,
  secureApplication,
  winstonLogger
} from "@nestjs-logging-tracing/api-core-modules";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  initWinston(loadDatabaseApiConfiguration().apiTitle);

  const app = await NestFactory.create(AppModule, {
    logger: ["log", "error", "warn", "debug", "verbose"]
  });

  secureApplication(app);

  const globalPrefix = process.env.GLOBAL_PREFIX ?? "api";
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 8081;

  await app.listen(port);
  const url = await app.getUrl();
  winstonLogger?.info(`🚀 Application is running on port: ${url}/${globalPrefix}`);
  ApplicationReadiness.getInstance().isReady = true;
}

(async (): Promise<void> => {
  await bootstrap();
})().catch((error: Error) => {
  winstonLogger?.error(`Nest application error: ${error.message}`);
});
