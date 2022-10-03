import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  GroupsOutlined,
  NotificationsOutlined,
  ContactMailOutlined,
  CastForEducationOutlined,
} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormatter } from '../../../../components/i18n';
import { useHelper } from '../../../../store';
import useDataLoader from '../../../../utils/ServerSideEvent';
import { fetchAudiences } from '../../../../actions/Audience';
import ResultsMenu from '../ResultsMenu';
import { fetchInjects, fetchInjectTypes } from '../../../../actions/Inject';
import { fetchExerciseChallenges } from '../../../../actions/Challenge';
import { fetchExerciseInjectExpectations } from '../../../../actions/Exercise';
import { fetchPlayers } from '../../../../actions/User';
import { fetchOrganizations } from '../../../../actions/Organization';
import { fetchExerciseCommunications } from '../../../../actions/Communication';
import DashboardDefinitionStatistics from './DashboardDefinitionStatistics';
import DashboardDefinitionScoreStatistics from './DashboardDefinitionScoreStatistics';
import DashboardDataStatistics from './DashboardDataStatistics';
import DashboardResultsStatistics from './DashboardResultsStatistics';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '10px 0 50px 0',
    padding: '0 200px 0 0',
  },
  metric: {
    position: 'relative',
    padding: 20,
    height: 100,
    overflow: 'hidden',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
  number: {
    fontSize: 30,
    fontWeight: 800,
    float: 'left',
  },
  icon: {
    position: 'absolute',
    top: 25,
    right: 15,
  },
  paper2: {
    position: 'relative',
    padding: 0,
    overflow: 'hidden',
    height: '100%',
  },
  paperChart: {
    position: 'relative',
    padding: '0 20px 0 0',
    overflow: 'hidden',
    height: '100%',
  },
  card: {
    width: '100%',
    height: '100%',
    marginBottom: 30,
    borderRadius: 6,
    padding: 0,
    position: 'relative',
  },
  heading: {
    display: 'flex',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useFormatter();
  // Fetching data
  const { exerciseId } = useParams();
  const {
    exercise,
    audiences,
    injects,
    challengesMap,
    injectTypesMap,
    audiencesMap,
    injectExpectations,
    injectsMap,
    usersMap,
    organizationsMap,
    organizations,
    communications,
  } = useHelper((helper) => {
    return {
      exercise: helper.getExercise(exerciseId),
      audiences: helper.getExerciseAudiences(exerciseId),
      audiencesMap: helper.getAudiencesMap(),
      injects: helper.getExerciseInjects(exerciseId),
      injectsMap: helper.getInjectsMap(),
      usersMap: helper.getUsersMap(),
      organizations: helper.getOrganizations(),
      organizationsMap: helper.getOrganizationsMap(),
      injectExpectations: helper.getExerciseInjectExpectations(exerciseId),
      challengesMap: helper.getChallengesMap(),
      injectTypesMap: helper.getInjectTypesMapByType(),
      communications: helper.getExerciseCommunications(exerciseId),
    };
  });
  useDataLoader(() => {
    dispatch(fetchAudiences(exerciseId));
    dispatch(fetchInjectTypes());
    dispatch(fetchInjects(exerciseId));
    dispatch(fetchExerciseChallenges(exerciseId));
    dispatch(fetchExerciseInjectExpectations(exerciseId));
    dispatch(fetchPlayers());
    dispatch(fetchExerciseCommunications(exerciseId));
    dispatch(fetchOrganizations());
  });
  return (
    <div className={classes.container}>
      <ResultsMenu exerciseId={exerciseId} />
      <Grid container={true} spacing={3} style={{ marginTop: -14 }}>
        <Grid item={true} xs={3} style={{ marginTop: -14 }}>
          <Paper variant="outlined" classes={{ root: classes.metric }}>
            <div className={classes.icon}>
              <GroupsOutlined color="primary" sx={{ fontSize: 50 }} />
            </div>
            <div className={classes.title}>{t('Players')}</div>
            <div className={classes.number}>
              {exercise.exercise_users_number}
            </div>
          </Paper>
        </Grid>
        <Grid item={true} xs={3} style={{ marginTop: -14 }}>
          <Paper variant="outlined" classes={{ root: classes.metric }}>
            <div className={classes.icon}>
              <NotificationsOutlined color="primary" sx={{ fontSize: 50 }} />
            </div>
            <div className={classes.title}>{t('Injects')}</div>
            <div className={classes.number}>
              {exercise.exercise_injects_statistics?.total_count ?? '-'}
            </div>
          </Paper>
        </Grid>
        <Grid item={true} xs={3} style={{ marginTop: -14 }}>
          <Paper variant="outlined" classes={{ root: classes.metric }}>
            <div className={classes.icon}>
              <CastForEducationOutlined color="primary" sx={{ fontSize: 50 }} />
            </div>
            <div className={classes.title}>{t('Audiences')}</div>
            <div className={classes.number}>{(audiences || []).length}</div>
          </Paper>
        </Grid>
        <Grid item={true} xs={3} style={{ marginTop: -14 }}>
          <Paper variant="outlined" classes={{ root: classes.metric }}>
            <div className={classes.icon}>
              <ContactMailOutlined color="primary" sx={{ fontSize: 50 }} />
            </div>
            <div className={classes.title}>{t('Messages')}</div>
            <div className={classes.number}>
              {exercise.exercise_communications_number}
            </div>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Typography variant="h1" style={{ marginTop: 10 }}>
        {t('Exercise definition and scenario')}
      </Typography>
      <DashboardDefinitionStatistics
        audiences={audiences}
        injects={injects}
        injectTypesMap={injectTypesMap}
      />
      <DashboardDefinitionScoreStatistics
        audiences={audiences}
        injects={injects}
        injectTypesMap={injectTypesMap}
        challengesMap={challengesMap}
      />
      <Typography variant="h1" style={{ marginTop: 60 }}>
        {t('Exercise data')}
      </Typography>
      <DashboardDataStatistics
        audiences={audiences}
        injects={injects}
        injectsMap={injectsMap}
        usersMap={usersMap}
        communications={communications}
      />
      <Typography variant="h1" style={{ marginTop: 60 }}>
        {t('Exercise results')}
      </Typography>
      <DashboardResultsStatistics
        usersMap={usersMap}
        injectsMap={injectsMap}
        audiences={audiences}
        injectTypesMap={injectTypesMap}
        audiencesMap={audiencesMap}
        injectExpectations={injectExpectations}
        organizations={organizations}
        organizationsMap={organizationsMap}
      />
    </div>
  );
};

export default Dashboard;