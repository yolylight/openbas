import { useTheme } from '@mui/styles';
import React, { FunctionComponent } from 'react';
import Chart from 'react-apexcharts';
import * as R from 'ramda';
import type { ExerciseStore } from '../../../../../actions/exercises/Exercise';
import { lineChartOptions } from '../../../../../utils/Charts';
import Empty from '../../../../../components/Empty';
import { useFormatter } from '../../../../../components/i18n';
import { useAppDispatch } from '../../../../../utils/hooks';
import type { Theme } from '../../../../../components/Theme';
import { useHelper } from '../../../../../store';
import type { InjectHelper } from '../../../../../actions/injects/inject-helper';
import useDataLoader from '../../../../../utils/ServerSideEvent';
import { fetchInjectTypes } from '../../../../../actions/Inject';
import { fetchExerciseInjectExpectations } from '../../../../../actions/Exercise';
import type { InjectExpectation } from '../../../../../utils/api-types';
import type { InjectExpectationStore } from '../../../../../actions/injects/Inject';

interface Props {
  exerciseId: ExerciseStore['exercise_id'];
}

const ExerciseDistributionScoreOverTimeByInjectType: FunctionComponent<Props> = ({
  exerciseId,
}) => {
  // Standard hooks
  const { t, nsdt, tPick } = useFormatter();
  const dispatch = useAppDispatch();
  const theme: Theme = useTheme();

  // Fetching data
  const { injectsMap, injectTypesMap, injectExpectations } = useHelper((helper: InjectHelper) => ({
    injectsMap: helper.getInjectsMap(),
    injectExpectations: helper.getExerciseInjectExpectations(exerciseId),
    injectTypesMap: helper.getInjectTypesMapByType(),
  }));
  useDataLoader(() => {
    dispatch(fetchExerciseInjectExpectations(exerciseId));
    dispatch(fetchInjectTypes());
  });

  let cumulation = 0;
  const injectsTypesScores = R.pipe(
    R.filter((n: InjectExpectationStore) => !R.isEmpty(n.inject_expectation_results)),
    R.map((n: InjectExpectationStore) => R.assoc(
      'inject_expectation_inject',
      injectsMap[n.inject_expectation_inject] || {},
      n,
    )),
    R.groupBy(R.path(['inject_expectation_inject', 'inject_type'])),
    R.toPairs,
    R.map((n: [string, InjectExpectationStore[]]) => {
      cumulation = 0;
      return [
        n[0],
        R.pipe(
          R.sortWith([R.ascend(R.prop('inject_expectation_updated_at'))]),
          R.map((i: InjectExpectationStore) => {
            cumulation += i.inject_expectation_score ?? 0;
            return R.assoc('inject_expectation_cumulated_score', cumulation, i);
          }),
        )(n[1]),
      ];
    }),
    R.map((n: [string, Array<InjectExpectationStore & { inject_expectation_cumulated_score: number }>]) => ({
      name: tPick(injectTypesMap && injectTypesMap[n[0]]?.label),
      color: injectTypesMap && injectTypesMap[n[0]]?.config?.color,
      data: n[1].map((i: InjectExpectation & { inject_expectation_cumulated_score: number }) => ({
        x: i.inject_expectation_updated_at,
        y: i.inject_expectation_cumulated_score,
      })),
    })),
  )(injectExpectations);

  return (
    <>
      {injectsTypesScores.length > 0 ? (
        <Chart
          // @ts-expect-error: Need to migrate Chart.js file
          options={lineChartOptions(
            theme,
            true,
            // @ts-expect-error: Need to migrate i18n.js file
            nsdt,
            null,
            undefined,
            false,
            true,
          )}
          series={injectsTypesScores}
          type="line"
          width="100%"
          height={350}
        />
      ) : (
        <Empty
          message={t(
            'No data to display or the simulation has not started yet',
          )}
        />
      )}
    </>
  );
};

export default ExerciseDistributionScoreOverTimeByInjectType;