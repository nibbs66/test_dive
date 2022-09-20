import React from 'react';
import ModalCard from "./Modal/ModalCard";
import ContactForm from "./ContactForm";

const ScheduleModal = ({showModal, setShowModal}) => {
    return (
        <ModalCard  showModal={showModal} setShowModal={setShowModal}>
          <ContactForm/>
        </ModalCard>
    );
};

export default ScheduleModal;
