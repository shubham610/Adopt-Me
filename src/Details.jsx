import { useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modals";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🕸️</h2>
      </div>
    );
  }
  const pet = results.data.pets[0];
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{pet.animal}</h2>
        <h2>{pet.breed}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>;
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                ;<button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};
export default Details;
