import React, { useState, useEffect } from 'react';
import '../CSS-files/DeleteButton.css';
import { BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

function DeleteButton({ watching, setWatching, userId, showId }) {
  const nav = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [watchingToken, setWatchingToken] = useState("");
  const [launchDelete, setLaunchDelete] = useState(false);

  const removeShowFromList = () => {
    setShowModal(true);
  };

  const handleDelete = async () => {
    const updatedWatching = watching.filter((w) => w.showId !== showId);
    await setLaunchDelete(true);
    setWatching(updatedWatching);
    nav('/');
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      removeShowFromList();
    }
  }

  //ApiUser watching login
  useEffect(() => {

    const requestBody = {
      username: 'watching_delete',
      password: 'watching_delete',
    };
    const URL = 'http://localhost:3000/api/v1/apiUsers/login';
    fetch(URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => setWatchingToken(data.token));
    
  }, [watchingToken]);

  //DELETE watching
  useEffect(() => {
    if (watchingToken !== "" && launchDelete) {
        const URL = `http://localhost:3000/api/v1/watching/${userId}/${showId}`;
        fetch(URL, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${watchingToken}`,
            'Content-Type': 'application/json',
        }})
        .then(setLaunchDelete(false));
    }
    
  }, [launchDelete, showId, userId, watchingToken]);

  return (
    <>
      <div style={{ cursor: 'pointer', display: 'inline-block' }} onClick={removeShowFromList} tabIndex="0" onKeyPress={handleKeyPress}>
        <span className="D-delete"><FormattedMessage id="DB-text"/></span>
        <span className="D-trash" style={{ marginLeft: '4px' }} role="img" aria-label="Bin">
          <BsFillTrashFill data-testid="trash-icon"/>
        </span>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="DB-confirmation"/></Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
          <FormattedMessage id="DB-no"/>
          </Button>
          <Button variant="danger" onClick={handleDelete}>
          <FormattedMessage id="DB-yes"/>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteButton;
