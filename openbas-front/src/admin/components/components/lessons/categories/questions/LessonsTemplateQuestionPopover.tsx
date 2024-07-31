import React, { FunctionComponent, useState } from 'react';
import LessonsTemplateQuestionForm, { LessonsTemplateQuestionInputForm } from './LessonsTemplateQuestionForm';
import { useFormatter } from '../../../../../../components/i18n';
import { deleteLessonsTemplateQuestion, updateLessonsTemplateQuestion } from '../../../../../../actions/Lessons';
import { useAppDispatch } from '../../../../../../utils/hooks';
import ButtonPopover from '../../../../../../components/common/ButtonPopover';
import DialogDelete from '../../../../../../components/common/DialogDelete';
import Drawer from '../../../../../../components/common/Drawer';
import type { LessonsTemplateQuestionStore } from '../../../../../../actions/lessons/Lessons';

interface Props {
  lessonsTemplateId: string;
  lessonsTemplateCategoryId: string;
  lessonsTemplateQuestion: LessonsTemplateQuestionStore;
}

const LessonsTemplateQuestionPopover: FunctionComponent<Props> = ({
  lessonsTemplateId,
  lessonsTemplateCategoryId,
  lessonsTemplateQuestion,
}) => {
  // Standard hooks
  const { t } = useFormatter();
  const dispatch = useAppDispatch();

  const initialValues = {
    lessons_template_question_content: lessonsTemplateQuestion.lessons_template_question_content,
    lessons_template_question_explanation: lessonsTemplateQuestion.lessons_template_question_explanation,
    lessons_template_question_order: lessonsTemplateQuestion.lessons_template_question_order?.toString(),
  };

  // Edition
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const onSubmitEdit = (data: LessonsTemplateQuestionInputForm) => {
    return dispatch(
      updateLessonsTemplateQuestion(
        lessonsTemplateId,
        lessonsTemplateCategoryId,
        lessonsTemplateQuestion.lessonstemplatequestion_id,
        data,
      ),
    ).then(() => handleCloseEdit());
  };

  // Deletion
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const submitDelete = () => {
    dispatch(
      deleteLessonsTemplateQuestion(
        lessonsTemplateId,
        lessonsTemplateCategoryId,
        lessonsTemplateQuestion.lessonstemplatequestion_id,
      ),
    ).then(() => handleCloseDelete());
  };

  const entries = [
    { label: 'Update', action: handleOpenEdit },
    { label: 'Delete', action: handleOpenDelete },
  ];

  return (
    <>
      <ButtonPopover entries={entries} variant={'icon'} />
      <DialogDelete
        open={openDelete}
        handleClose={handleCloseDelete}
        handleSubmit={submitDelete}
        text={t('Do you want to delete this lessons learned question?')}
      />
      <Drawer
        open={openEdit}
        handleClose={handleCloseEdit}
        title={t('Update the lessons learned question')}
      >
        <LessonsTemplateQuestionForm
          onSubmit={onSubmitEdit}
          handleClose={handleCloseEdit}
          initialValues={initialValues}
          editing
        />
      </Drawer>
    </>
  );
};

export default LessonsTemplateQuestionPopover;