import React, { FC, useState, useEffect } from 'react';
import './popUpMessage.scss';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slices/massegeSlice';

interface PopUpMessageProps {}

const PopUpMessage: FC<PopUpMessageProps> = () => {
  const openModal = useSelector((store: any) => store.massegeSlice.openModal);
  const massage = useSelector((store: any) => store.massegeSlice.massage);
  const dispatch = useDispatch();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (openModal) {
      timeoutId = setTimeout(() => {
        dispatch(closeModal());
      }, 3000); // 3 שניות
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [openModal, dispatch]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div className='PopUpMessage'>
      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{massage.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{massage.body}</Modal.Body>
      </Modal>
    </div>
  );
};

export default PopUpMessage;
