import React, { useState } from "react";
import axios from "axios";

const NewCarPost = ({ handleCloseSecondSection, refresh, setRefresh }) => {
  const server = process.env.SERVER ;

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [color, setColor] = useState("");
  const [fuel, setFuel] = useState("");
  const [seats, setSeats] = useState("");
  const [doors, setDoors] = useState("");
  const [body, setBody] = useState("");
  const [bestDeal, setBestDeal] = useState("");
  const [transmission, setTransmission] = useState("");
  const [description, setDescription] = useState("");
  const [engine, setEngine] = useState("");
  const [image, setImage] = useState("");
  const [year, setYear] = useState("");

  // Handle New Car  Post

  const handleNewCar = (e) => {
    e.preventDefault();

    console.log(image);

    const data = new FormData();

    Array.from(image).forEach((i) => {
      data.append("image", i);
    });
    data.append("price", price);
    data.append("make", make);
    data.append("model", model);
    data.append("bestDeal", bestDeal);
    data.append("transmission", transmission);
    data.append("description", description);
    data.append("mileage", mileage);
    data.append("seats", seats);
    data.append("doors", doors);
    data.append("fuel", fuel);
    data.append("color", color);
    data.append("body", body);
    data.append("engine", engine);
    data.append("year", year);

    axios
      .post(`${server}/car`, data)
      .then((response) => {
        setRefresh(!refresh);
        setMake("");
        setModel("");
        setPrice("");
        setMileage("");
        setColor("");
        setFuel("");
        setSeats("");
        setDoors("");
        setBody("");
        setBestDeal("");
        setTransmission("");
        setDescription("");
        setEngine("");
        setImage("");
        setYear("");
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form
        className="flex relative flex-wrap justify-center mt-10 rounded"
        onSubmit={handleNewCar}
        encType="multipart/form-data"
      >
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl text-center mb-5 text-gold">
            {" "}
            Ajouter une Nouvelle Voiture
          </h1>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer absolute top-2  md:top-0 right-2 md:right-11 text-gold"
            onClick={(e) => handleCloseSecondSection()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <section className="flex flex-wrap justify-center w-full">
          <div className="w-full md:w-2/4 flex flex-col px-5 mb-5">
            <label htmlFor="Name" className="text-gold">
              Prix
            </label>
            <input
              type="text"
              className="border-2 border-gold mb-5"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="make" className="text-gold">
              Marque
            </label>
            <input
              type="text"
              className="border-2 border-gold mb-5"
              name="make"
              onChange={(e) => setMake(e.target.value)}
            />

            <label htmlFor="model" className="text-gold">
              Modèle
            </label>
            <input
              type="text"
              className="border-2 border-gold mb-5"
              name="model"
              onChange={(e) => setModel(e.target.value)}
            />

            <label htmlFor="fuel" className="text-gold">
              Carburant
            </label>
            <input
              type="text"
              className="border-2 border-gold mb-5"
              name="fuel"
              onChange={(e) => setFuel(e.target.value)}
            />

            <label htmlFor="color" className="text-gold">
              Couleur
            </label>
            <input
              type="text"
              className="border-2 border-gold mb-5"
              name="color"
              onChange={(e) => setColor(e.target.value)}
            />

            <label htmlFor="body" className="text-gold">
              Type de Véhicule
            </label>
            <input
              type="text"
              className="border-2 border-gold mb-5"
              name="body"
              onChange={(e) => setBody(e.target.value)}
            />

            <select
              className="flex border-2 border-gold my-4 "
              value={doors}
              onChange={(e) => setDoors(e.target.value)}
            >
              <option defaultValue> Nombre de Portes</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="w-full md:w-2/4 flex flex-col px-5 mb-5">
            <label htmlFor="engine" className="text-gold">
              Moteur
            </label>
            <input
              type="text"
              className="border-2 border-gold mb-5"
              name="engine"
              onChange={(e) => setEngine(e.target.value)}
            />

            <label htmlFor="mileage" className="text-gold">
              Kilométrage
            </label>
            <input
              type="text"
              className="border-2 border-gold mb-5"
              name="mileage"
              onChange={(e) => setMileage(e.target.value)}
            />

            <label htmlFor="year" className="text-gold">
              Anneé
            </label>
            <input
              type="text"
              className="border-2 border-gold mb-5"
              name="year"
              onChange={(e) => setYear(e.target.value)}
            />

            <fieldset className="flex border-2 border-gold gap-2 p-3 my-2">
              <legend className="text-gold">
                Choisir Type Boîte de vitesse
              </legend>
              <label htmlFor="transmission" className="text-gold">
                Automatique
              </label>
              <input
                type="radio"
                value="Automatique"
                className="border-2 border-gold "
                name="transmission"
                onChange={(e) => setTransmission(e.target.value)}
              />

              <label htmlFor="transmission" className="text-gold">
                Manuelle
              </label>
              <input
                type="radio"
                value="Manuelle"
                className="border-2 border-gold "
                name="transmission"
                onChange={(e) => setTransmission(e.target.value)}
              />

              <label htmlFor="transmission" className="text-gold">
                Séquentielle
              </label>
              <input
                type="radio"
                value="Séquentielle"
                className="border-2 border-gold "
                name="transmission"
                onChange={(e) => setTransmission(e.target.value)}
              />
            </fieldset>

            <fieldset className="flex border-2 border-gold gap-2 p-3">
              <legend className="text-gold">Bon Plan? </legend>
              <label htmlFor="bestDeal" className="text-gold">
                No
              </label>
              <input
                type="radio"
                value="no"
                className="border-2 border-gold "
                name="bestDeal"
                onChange={(e) => setBestDeal("no")}
              />

              <label htmlFor="bestDeal" className="text-gold">
                Oui
              </label>
              <input
                type="radio"
                value="yes"
                className="border-2 border-gold"
                name="bestDeal"
                onChange={(e) => setBestDeal("yes")}
              />
            </fieldset>

            <select
              className="flex border-2 border-gold my-4"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            >
              <option defaultValue> Nombre de Place(s)</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>

          <div className="flex justify-center items-center w-full md:w-2/4 mb-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-3/4 h-32 bg-gray-300 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer p-8"
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="mb-3 w-4 h-4 md:w-10 md:h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-xs md:text-sm text-gray-500">
                  <span className="font-semibold">
                    Click Pour Adjouter Image(s)
                  </span>{" "}
                  ou glisser et déposer
                </p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or JPEG</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                name="image"
                multiple
                className="hidden"
                onChange={(e) => setImage(e.target.files)}
              />
            </label>
          </div>
        </section>

        <section className=" flex flex-col w-full px-5 md:w-2/4">
          <label htmlFor="description" className="text-gold">
            Description
          </label>
          <textarea
            type="text"
            className=" border-2 border-gold md:mb-5 h-20"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className="bg-gold hover:bg-gold/70  rounded w-1/2 md:w-1/4 mt-3 mb-20 m-auto text-white py-2"
          >
            {" "}
            Envoyer
          </button>
        </section>
      </form>
    </div>
  );
};

export default NewCarPost;
