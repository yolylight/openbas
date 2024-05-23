package io.openbas.injectors.lade.model;

import io.openbas.database.model.InjectStatusExecution;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Getter
public class LadeWorkflow {

    private final List<InjectStatusExecution> traces = new ArrayList<>();

    @Setter
    private boolean done = false;

    @Setter
    private boolean fail = false;

    @Setter
    private Instant stopTime;

    public void addTrace(InjectStatusExecution trace) {
        this.traces.add(trace);
    }

}