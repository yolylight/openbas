import type { Exercise, Inject, Scenario } from '../../utils/api-types';

export interface InjectHelper {
  getExerciseInjects: (exerciseId: Exercise['exercise_id']) => Inject[];
  getScenarioInjects: (scenarioId: Scenario['scenario_id']) => Inject[];
  getExerciseInjectExpectations: (scenarioId: Scenario['scenario_id']) => InjectExpectation[];
  getInjectsMap: () => Record<string, Inject>;
}
