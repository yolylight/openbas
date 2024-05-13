package io.openbas.executors.tanium;

import io.openbas.asset.EndpointService;
import io.openbas.executors.tanium.client.TaniumExecutorClient;
import io.openbas.executors.tanium.config.TaniumExecutorConfig;
import io.openbas.executors.tanium.service.TaniumExecutorContextService;
import io.openbas.executors.tanium.service.TaniumExecutorService;
import io.openbas.integrations.ExecutorService;
import io.openbas.integrations.InjectorService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.Duration;

@ConditionalOnProperty(prefix = "executor.tanium", name = "enable")
@RequiredArgsConstructor
@Service
public class TaniumExecutor {

    private final TaniumExecutorConfig config;
    private final TaskScheduler taskScheduler;
    private final TaniumExecutorClient client;
    private final EndpointService endpointService;
    private final TaniumExecutorContextService taniumExecutorContextService;
    private final ExecutorService executorService;
    private final InjectorService injectorService;

    @PostConstruct
    public void init() {
        // If enabled, scheduled every X seconds
        if (this.config.isEnable()) {
            TaniumExecutorService service = new TaniumExecutorService(this.executorService, this.client, this.config, this.taniumExecutorContextService, this.endpointService, this.injectorService);
            this.taskScheduler.scheduleAtFixedRate(service, Duration.ofSeconds(60));
        }
    }
}