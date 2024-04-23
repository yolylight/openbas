package io.openbas.rest.injector_contract.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static io.openbas.config.AppConfig.MANDATORY_MESSAGE;

@Getter
@Setter
public class InjectorContractAddInput {

    @NotBlank(message = MANDATORY_MESSAGE)
    @JsonProperty("contract_id")
    private String id;

    @NotBlank(message = MANDATORY_MESSAGE)
    @JsonProperty("injector_id")
    private String injectorId;

    @Getter
    @JsonProperty("contract_manual")
    private boolean manual = false;

    @Getter
    @JsonProperty("contract_labels")
    private Map<String, String> labels;

    @Getter
    @JsonProperty("contract_attack_patterns_external_ids")
    private List<String> attackPatternsExternalIds = new ArrayList<>();

    @Getter
    @NotBlank(message = MANDATORY_MESSAGE)
    @JsonProperty("contract_content")
    private String content;

    @JsonProperty("is_atomic_testing")
    private boolean isAtomicTesting = true;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getInjectorId() {
        return injectorId;
    }

    public void setInjectorId(String injectorId) {
        this.injectorId = injectorId;
    }

    public boolean isManual() {
        return manual;
    }

    public void setManual(boolean manual) {
        this.manual = manual;
    }

    public Map<String, String> getLabels() {
        return labels;
    }

    public void setLabels(Map<String, String> labels) {
        this.labels = labels;
    }

    public List<String> getAttackPatternsExternalIds() {
        return attackPatternsExternalIds;
    }

    public void setAttackPatternsExternalIds(List<String> attackPatternsExternalIds) {
        this.attackPatternsExternalIds = attackPatternsExternalIds;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isAtomicTesting() {
        return isAtomicTesting;
    }

    public void setAtomicTesting(boolean atomicTesting) {
        isAtomicTesting = atomicTesting;
    }
}
