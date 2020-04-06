import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export const ModalDelete = ({
    show,
    onClose,
    onDelete,
    title }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            animation={false}
            backdrop='static'
            dialogClassName="my-modal-width"
            centered
        >
            <Modal.Header
                className='rounded-0'
                style={{ backgroundColor: '#002857' }}
                closeButton
            >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Footer
                className='rounded-0'
                style={{ backgroundColor: '#00346e' }}
            >
                <Button
                    variant="secondary"
                    onClick={onClose}
                >
                    Cancel
                 </Button>
                <Button
                    variant="danger"
                    onClick={onDelete}
                >
                    DELETE
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
