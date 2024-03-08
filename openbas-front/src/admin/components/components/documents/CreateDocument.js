import React, { useContext, useState } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';
import withStyles from '@mui/styles/withStyles';
import { Fab, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Add, ControlPointOutlined } from '@mui/icons-material';
import DocumentForm from './DocumentForm';
import { addDocument, fetchDocument } from '../../../../actions/Document';
import inject18n from '../../../../components/i18n';
import { DocumentContext } from '../Context';
import Drawer from '../../../../components/common/Drawer';
import Dialog from '../../../../components/common/Dialog';

const styles = (theme) => ({
  createButton: {
    position: 'fixed',
    bottom: 30,
    right: 30,
  },
  text: {
    fontSize: 15,
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
});

const CreateDocument = (props) => {
  const { classes, t, inline, filters } = props;
  const [open, setOpen] = useState(false);

  // Context
  const context = useContext(DocumentContext);
  const initialValues = context
    ? context.onInitDocument()
    // TODO: should be platform
    : {
      document_tags: [],
      document_exercises: [],
      document_scenarios: [],
    };
  const computeInputValues = (data) => R.pipe(
    R.assoc('document_tags', R.pluck('id', data.document_tags)),
    R.assoc('document_exercises', R.pluck('id', data.document_exercises)),
    R.assoc('document_scenarios', R.pluck('id', data.document_scenarios)),
  )(data);

  const onSubmit = (data) => {
    const inputValues = computeInputValues(data);
    const formData = new FormData();
    formData.append('file', data.document_file[0]);
    const blob = new Blob([JSON.stringify(inputValues)], {
      type: 'application/json',
    });
    formData.append('input', blob);
    return props.addDocument(formData).then((result) => {
      if (result.result) {
        if (props.onCreate) {
          props.onCreate(result.result);
        }
        return setOpen(false);
      }
      return result;
    });
  };
  return (
    <>
      {inline === true ? (
        <ListItem
          button
          divider
          onClick={() => setOpen(true)}
          color="primary"
        >
          <ListItemIcon color="primary">
            <ControlPointOutlined color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={t('Create a new document')}
            classes={{ primary: classes.text }}
          />
        </ListItem>
      ) : (
        <Fab
          onClick={() => setOpen(true)}
          color="primary"
          aria-label="Add"
          className={classes.createButton}
        >
          <Add />
        </Fab>
      )}
      {inline ? (
        <Dialog
          open={open}
          handleClose={() => setOpen(false)}
          title={t('Create a new document')}
        >
          <DocumentForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            handleClose={() => setOpen(false)}
            filters={filters}
          />
        </Dialog>
      ) : (
        <Drawer
          open={open}
          handleClose={() => setOpen(false)}
          title={t('Create a new document')}
        >
          <DocumentForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            handleClose={() => setOpen(false)}
            filters={filters}
          />
        </Drawer>
      )}
    </>
  );
};

CreateDocument.propTypes = {
  classes: PropTypes.object,
  t: PropTypes.func,
  addDocument: PropTypes.func,
  fetchDocument: PropTypes.func,
  inline: PropTypes.bool,
  filters: PropTypes.array,
};

export default R.compose(
  connect(null, { addDocument, fetchDocument }),
  inject18n,
  withStyles(styles),
)(CreateDocument);