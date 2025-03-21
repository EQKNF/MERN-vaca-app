import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/authContext";
import "./PlaceItem.css";

const PlaceItem = ({ id, image, title, description, address, coordinates }) => {
  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => {
    setShowMap(false);
  };
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const closeDeleteWarningHandler = () => setShowConfirmModal(false);
  const confirmDeleteHandler = () => {
    // TODO: Delete place from backend
    setShowConfirmModal(false);
    console.log("Place deleted");
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map coordinates={coordinates} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={closeDeleteWarningHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={closeDeleteWarningHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>Do you want to proceed and delete this place?</p>
      </Modal>

      <li className="place-item">
        <Card>
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              View on Map
            </Button>
            {auth.isLoggedIn && (
              <>
                <Button to={`/places/${id}`}>Edit</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
