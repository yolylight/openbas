import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { TextField } from '../../../components/TextField';
import inject18n from '../../../components/i18n';

class PasswordForm extends Component {
  validate(values) {
    const { t } = this.props;
    const errors = {};
    if (
      !values.user_plain_password
      || values.user_plain_password !== values.password_confirmation
    ) {
      errors.user_plain_password = t('Passwords do no match');
    }

    return errors;
  }

  render() {
    const { onSubmit, t } = this.props;
    return (
      <Form onSubmit={onSubmit} validate={this.validate.bind(this)}>
        {({ handleSubmit }) => (
          <form id="passwordForm" onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              name="user_plain_password"
              fullWidth={true}
              type="password"
              label={t('Password')}
            />
            <TextField
              variant="standard"
              name="password_confirmation"
              fullWidth={true}
              type="password"
              label={t('Confirmation')}
              style={{ marginTop: 20 }}
            />
          </form>
        )}
      </Form>
    );
  }
}

PasswordForm.propTypes = {
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
};

export default inject18n(PasswordForm);