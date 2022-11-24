import React, { useState } from "react";
import axios from "axios";
import EditCarPostLG from "./EditCarPostLG";
import EditCarPostSM from "./EditCarPostSM";

const EditCarPost = ({
  selectedId,
  handleCloseSecondSection,
  refresh,
  setRefresh,
  cars,
}) => {
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
  const [imageIndex, setImageIndex] = useState(0);
  const [validateSending, setValidateSending] = useState("");

  const server = process.env.SERVER ;

  let filteredCar = cars.filter((car) => car._id === selectedId);

  // Edit Specific Car
  const handleCarEdit = (e, id) => {
    e.preventDefault();
    const data = new FormData();
    Array?.from(image)?.forEach((i) => {
      data.append("image", i);
    });
    data.append("price", price);
    data.append("image", image);
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
      .put(`${server}/car/${id}`, data)
      .then((response) => {
        setRefresh(!refresh);
        setImageIndex(imageIndex === 0 ? imageIndex + 1 : imageIndex);
        setValidateSending(response.data);
      })
      .catch((err) => console.log(err));
    return setInterval(() => {
      return setValidateSending("");
    }, 4000);
  };

  // Delete Specific Car
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${server}/car/${selectedId}`)
      .then((res) => {
        handleCloseSecondSection()
        setRefresh(!refresh);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  //Delete Single Image
    const handleImageDelete = (e, image) => {
      e.preventDefault();
  
      axios
        .put(`${server}/car/${selectedId}/image`, image)
        .then((response) => {
          setRefresh(!refresh);
          setValidateSending(response.data);
          if (imageIndex <= 0) {
            setImageIndex(1);
          } else if (imageIndex > filteredCar[0].image.length) {
            setImageIndex(filteredCar[0].image.length);
          } else if (imageIndex === filteredCar[0].image.length) {
            setImageIndex(filteredCar[0].image.length - 1);
          } else if (filteredCar[0].image.length === 1) {
            setImageIndex(1);
          }
        })
        .catch((err) => console.log(err));
  
      return setInterval(() => {
        return setValidateSending("");
      }, 4000);
    };

  const handleAllImageDelete = (e) => {
    e.preventDefault();
    axios
      .put(`${server}/car/${selectedId}/all`)
      .then((response) => {
        setRefresh(!refresh);
        setValidateSending(response.data);
      })
      .catch((err) => console.log(err));
    return setInterval(() => {
      return setValidateSending("");
    }, 4000);
  };

  // Slider
  const nextImage = (e) => {
    e.preventDefault();
    const endArray = filteredCar[0].image.length;
    const next = imageIndex + 1 >= endArray ? 0 : imageIndex + 1;
    setImageIndex(next);
  };
  const previousImage = (e) => {
    e.preventDefault();
    const endArray = filteredCar[0].image.length;
    const prev = imageIndex <= 0 ? endArray - 1 : imageIndex - 1;
    console.log(prev, endArray, imageIndex);
    setImageIndex(prev);
  };

  return (
    <div className="p-4 md:p-10 flex flex-col w-full h-full">
      <header className="w-full">
        <h1 className="text-3xl text-center mb-5 text-gold">
          Editer la Fiche Voiture
        </h1>
      </header>

      <section className="flex justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer text-gold"
          onClick={(e) => handleDelete(e)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer text-gold"
          onClick={(e) => handleCloseSecondSection()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </section>

      <section className="hidden md:block">
        <EditCarPostLG
          handleCarEdit={handleCarEdit}
          selectedId={selectedId}
          filteredCar={filteredCar}
          setPrice={setPrice}
          setMake={setMake}
          setFuel={setFuel}
          setColor={setColor}
          setBody={setBody}
          setDoors={setDoors}
          setEngine={setEngine}
          setMileage={setMileage}
          setYear={setYear}
          setTransmission={setTransmission}
          setBestDeal={setBestDeal}
          setSeats={setSeats}
          handleAllImageDelete={handleAllImageDelete}
          imageIndex={imageIndex}
          handleImageDelete={handleImageDelete}
          previousImage={previousImage}
          nextImage={nextImage}
          setImage={setImage}
          setDescription={setDescription}
          setModel={setModel}
          validateSending={validateSending}
        />
      </section>

      <section className="md:hidden">
        <EditCarPostSM
          handleCarEdit={handleCarEdit}
          selectedId={selectedId}
          filteredCar={filteredCar}
          setPrice={setPrice}
          setMake={setMake}
          setFuel={setFuel}
          setColor={setColor}
          setBody={setBody}
          setDoors={setDoors}
          setEngine={setEngine}
          setMileage={setMileage}
          setYear={setYear}
          setTransmission={setTransmission}
          setBestDeal={setBestDeal}
          setSeats={setSeats}
          handleAllImageDelete={handleAllImageDelete}
          imageIndex={imageIndex}
          handleImageDelete={handleImageDelete}
          previousImage={previousImage}
          nextImage={nextImage}
          setImage={setImage}
          setDescription={setDescription}
          setModel={setModel}
        />
      </section>
    </div>
  );
};

export default EditCarPost;
