import { Module } from "@nestjs/common";
import { TracingModule } from "@dollarsign/nestjs-jaeger-tracing";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TracingModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        exporterConfig: {
          serviceName: config.get("apiTitle")
        },
        isSimpleSpanProcessor: true
      })
    })
  ]
})
export class CoreTracingModule {}
