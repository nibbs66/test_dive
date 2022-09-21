import React from 'react';
import ModalCard from "./Modal/ModalCard";
import ContactForm from "./ContactForm";

const ScheduleModal = ({showModal, setShowModal, subject, regarding}) => {
    return (
        <ModalCard  showModal={showModal} setShowModal={setShowModal}>
          <ContactForm subject={subject} regarding={regarding}/>
        </ModalCard>
    );
};

export default ScheduleModal;
