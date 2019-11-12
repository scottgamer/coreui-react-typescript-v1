import React, { useState } from "react";
import {
  Button,
  Modal as RsModal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

// TODO: test modal component

const Modal: React.FC<any> = props => {
  const [modal, setModal] = useState({
    isOpen: false
  });

  const toggleHandler = () => {
    const prevModal = { ...modal };
    setModal({ ...prevModal, isOpen: !prevModal.isOpen });
  };

  return (
    <div>
      <RsModal
        isOpen={modal.isOpen}
        toggle={toggleHandler}
        className={"modal-danger " + props.className}
      >
        <ModalHeader toggle={toggleHandler}>{props.title}</ModalHeader>
        <ModalBody>{props.body}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleHandler}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggleHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </RsModal>
    </div>
  );
};

export default Modal;
