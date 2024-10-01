package io.openbas.expectation;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import static java.util.Optional.ofNullable;

@Component
@Setter
public class ExpectationPropertiesConfig {

  public static long DEFAULT_TECHNICAL_EXPECTATION_EXPIRATION_TIME = 21600L; // 6 hours
  public static long DEFAULT_HUMAN_EXPECTATION_EXPIRATION_TIME = 86400L; // 24 hours

  @Value("${openbas.expectation.technical.expiration-time:#{null}}")
  private Long technicalExpirationTime;
  @Value("${openbas.expectation.detection.expiration-time:#{null}}")
  private Long detectionExpirationTime;
  @Value("${openbas.expectation.prevention.expiration-time:#{null}}")
  private Long preventionExpirationTime;

  @Value("${openbas.expectation.human.expiration-time:#{null}}")
  private Long humanExpirationTime;
  @Value("${openbas.expectation.challenge.expiration-time:#{null}}")
  private Long challengeExpirationTime;
  @Value("${openbas.expectation.article.expiration-time:#{null}}")
  private Long articleExpirationTime;
  @Value("${openbas.expectation.manual.expiration-time:#{null}}")
  private Long manualExpirationTime;

  public long getDetectionExpirationTime() {
    return ofNullable(this.detectionExpirationTime)
        .orElse(
            ofNullable(this.technicalExpirationTime)
                .orElse(DEFAULT_TECHNICAL_EXPECTATION_EXPIRATION_TIME)
        );
  }

  public long getPreventionExpirationTime() {
    return ofNullable(this.preventionExpirationTime)
        .orElse(
            ofNullable(this.technicalExpirationTime)
                .orElse(DEFAULT_TECHNICAL_EXPECTATION_EXPIRATION_TIME)
        );
  }

  public long getChallengeExpirationTime() {
    return ofNullable(this.challengeExpirationTime)
        .orElse(
            ofNullable(this.humanExpirationTime)
                .orElse(DEFAULT_HUMAN_EXPECTATION_EXPIRATION_TIME)
        );
  }

  public long getArticleExpirationTime() {
    return ofNullable(this.articleExpirationTime)
        .orElse(
            ofNullable(this.humanExpirationTime)
                .orElse(DEFAULT_HUMAN_EXPECTATION_EXPIRATION_TIME)
        );
  }

  public long getManualExpirationTime() {
    return ofNullable(this.manualExpirationTime)
        .orElse(
            ofNullable(this.humanExpirationTime)
                .orElse(DEFAULT_HUMAN_EXPECTATION_EXPIRATION_TIME)
        );
  }

}