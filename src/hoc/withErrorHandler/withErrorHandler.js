import React from 'react';
import Modal from '../../components/UI/Modal';

const withErrorHandler = (WrappedComponent) => {
  return (props) => {
    return (
      <React.Fragment>
        <Modal show>Error</Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  }
};

export default withErrorHandler;