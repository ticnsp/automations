
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { API } from 'aws-amplify';
import LoaderButton from '../../components/LoaderButton';

export default function DeleteSemesterModal(props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleShowDeleteModal() {
    setShowDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
  }

  async function handleDelete() {
    const {
      semester,
      redirectFunction,
    } = props;
    setIsDeleting(true);
    try {
      await deleteSemester(semester);
    } catch(error) {
      alert(error);
    }
    setIsDeleting(false);
    handleCloseDeleteModal();
    redirectFunction();
  }

  async function deleteSemester(semester) {
    const { semesterId } = semester;
    return API.del('semesters', `/${semesterId}`);
  }

  return (
    <>
      <Button
        variant="warning"
        onClick={handleShowDeleteModal}
      >
        Delete
      </Button>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this semester?
      </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseDeleteModal}
            disabled={isDeleting}
          >
            Close
        </Button>
          <LoaderButton
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
            isLoading={isDeleting}
          >
            Delete
        </LoaderButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}