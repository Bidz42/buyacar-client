import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CarTextSM from "../components/singleCar/CarTextSM";
import CarTextLG from "../components/singleCar/CarTextLG";
import ContactSingleCar from "../components/singleCar/ContactSingleCar";
import { HashLink } from "react-router-hash-link";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [imageIndex, setImageIndex] = useState(0);

  const server = "https://muddy-moth-top-hat.cyclic.app" ;


  useEffect(() => {
    axios
      .get(`${server}/car/${id}`)
      .then((res) => {
        setCar(res.data);
      })
      .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextImage = () => {
    const endArray = car.image.length;
    const next = imageIndex + 1 === endArray ? 0 : imageIndex + 1;
    setImageIndex(next);
  };

  const previousImage = () => {
    const endArray = car.image.length;
    const prev = imageIndex <= 0 ? endArray - 1 : imageIndex - 1;
    setImageIndex(prev);
  };
  
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
});

  return (
    <div className="text-white w-full">
      <header className="flex w-full justify-center mt-10 mb-3 font-bold text-gold text-[2rem] md:text-[3rem]">
        {car?.make} {car?.model}
      </header>

      <section>
        <HashLink smooth to="/:id#contact">
        <span className="flex w-full justify-center mb-10 font-bold text-gold text-base underline cursor-pointer">
          Cliquez ici pour vous renseigner</span>
        </HashLink>
      </section>

      <section className="flex w-full flex-col lg:flex-row">
        
        <div className="w-full">
          {car.image && (
            <div key={car._id}>
              <img
                src={car?.image[imageIndex]}
                alt={car?.make}
                className="flex justify-center mx-auto h-[150px] sm:h-[200px] md:h-[400px] lg:h-[500px] mb-5"
              />
            </div>
          )}
          <div className="flex justify-center mb-10">
            <button onClick={(e) => previousImage()} className="pr-2">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gold "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <p className="text-white text-lg">
              {imageIndex + 1} / {car?.image?.length}
            </p>

            <button onClick={(e) => nextImage()} className="pl-2">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
</section>

<div className="lg:hidden">
       <CarTextSM car={car} />
</div>
<div className="hidden lg:block">
        <CarTextLG car={car} />
</div>
<div id="contact">
<ContactSingleCar car={car} />
</div>
      
    </div>
  );
};

export default CarDetails;
