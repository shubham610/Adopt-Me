/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["dog", "cat", "bird", "rabbit", "reptile"];
const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  // const [location, setLoacation] = useState("");
  const [animal, setAnimal] = useState("");
  // const [breed, setBreed] = useState("");
  // const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const [adoptedPet] = useContext(AdoptedPetContext);
  // useEffect(() => {
  //   requestPets();
  // }, []);
  // async function requestPets() {
  //   const res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //   );
  //   const json = await res.json();
  //   setPets(json.pets);
  // }
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // requestPets();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            // onChange={(e) => setLoacation(e.target.value)}
            id="location"
            name="location"
            // value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            // value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              //   setBreed("");
            }}
            // onBlur={(e) => {
            //   setAnimal(e.target.value);
            //   //   setBreed("");
            // }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={!breeds.length}
            name="breed"
            // value={breed}
            // onChange={(e) => setBreed(e.target.value)}
            // onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
export default SearchParams;
