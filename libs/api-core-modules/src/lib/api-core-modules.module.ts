import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { MetricsModule } from "./metrics/metrics.module";
import { ReadinessModule } from "./readiness/readiness.module";
import { PrometheusModule } from "./prometheus/prometheus.module";
import { CoreTracingModule } from "./tracing/tracing.module";

@Module({
  controllers: [],
  providers: [],
  imports: [HealthModule, MetricsModule, ReadinessModule, PrometheusModule, CoreTracingModule],
  exports: [HealthModule, MetricsModule, ReadinessModule, PrometheusModule, CoreTracingModule]
})
export class ApiCoreModulesModule {}
