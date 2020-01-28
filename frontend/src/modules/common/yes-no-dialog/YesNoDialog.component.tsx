import React, { ReactElement } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import LoadingIndicator from '../loading-indicator';
import FormError from '../form/form-error';

interface Props {
  title: string;
  question: any;
  yesText: string;
  noText: string;
  handleYes: any;
  handleNo: any;
  handleCancel: any;
  show: boolean;
  loading: boolean;
  loadingMsg: string;
  errorMsg: string;
  className?: string;
}

const YesNoDialog = (props: Props): ReactElement => {
  const {
    title,
    question,
    yesText,
    noText,
    handleYes,
    handleNo,
    handleCancel,
    show,
    loading,
    loadingMsg,
    errorMsg,
    className,
  } = props;

  return (
    <Modal
      open={show}
      onClose={handleCancel}
      className={className || ''}
      size="small"
    >
      <Modal.Header>
        <Modal.Header>{title}</Modal.Header>
      </Modal.Header>

      <Modal.Content>
        <Modal.Description>
          <LoadingIndicator loading={loading} msg={loadingMsg} />
          {!loading && question}
          <FormError errors={errorMsg ? [errorMsg] : []} />
        </Modal.Description>
      </Modal.Content>

      {!loading && (
        <Modal.Actions>
          <Button secondary onClick={handleNo}>
            {noText}
          </Button>
          <Button primary onClick={handleYes}>
            {yesText}
          </Button>
        </Modal.Actions>
      )}
    </Modal>
  );
};

export default YesNoDialog;
