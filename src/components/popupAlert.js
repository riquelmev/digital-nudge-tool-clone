// import Modal from "react-bootstrap/Modal";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./popupstyles.css"

function PopupAlert({showPopupMode, closeModal, openModal}) {
  // let [show, setShow] = useState({showPopupMode});
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // if (show) {
  //     handleShow();
  // }

  // console.log(show)

  return (
    <>
      {/* <div onClick={handleShow}>
      </div> */}

      <Modal
        show={showPopupMode}
        onHide={closeModal}
        backdrop="static"
        centered={true}
        keyboard={false}
        dialogClassName="popup-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{color: 'black'}}>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: 'black'}}>ChatGPT sometimes writes plausible-sounding but incorrect answers. Does this information seem accurate?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Continue
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupAlert;