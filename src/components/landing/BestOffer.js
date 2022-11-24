import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const BestOffer = () => {
 

  const [bestOffer, setBestOffer] = useState([]);
  const [bestOfferIndex, setBestOfferIndex] = useState(0);

  const server = "https://muddy-moth-top-hat.cyclic.app" ;

  useEffect(() => {
    axios.get(`${server}/car/bestdeals`)
      .then(response => {
        setBestOffer(response.data)})
      .catch(err => console.log(err))


  }, [])

  const nextBestOffer = () => {
    const endArray = bestOffer.length;
    const next = bestOfferIndex + 1 === endArray ? 0 : bestOfferIndex + 1;
    setBestOfferIndex(next);
  };

  const previousBestOffer = () => {
    const endArray = bestOffer.length;
    const prev = bestOfferIndex <= 0 ? endArray - 1 : bestOfferIndex - 1;
    setBestOfferIndex(prev);
  };

  return (
    <div
      className="w-full bg-black my-10 py-10 rounded-lg text-white flex flex-col drop-shadow-2xl text-xs sm:text-sm md:text-xl "
      id="bestOffer"
    >
      <header
        className="text-2xl md:text-5xl text-center m-auto font-bold w-2/4 text-gold "
        id="bonPlans"
      >
        ~ <span className="text-lg md:text-4xl text-center"> Bons Plans </span> ~
      </header>

      <section className="text-center text-[1.5rem] md:text-[3rem] my-4 md:my-10 w-2/4 m-auto drop-shadow-xl">
        <h1>
          {bestOffer[bestOfferIndex]?.make + " " + bestOffer[bestOfferIndex]?.model}
        </h1>
      </section>

      <section className="flex md:px-28">
        <button onClick={(e) => previousBestOffer()} className="pr-2">
          <svg
            aria-hidden="true"
            className="w-5 h-5 md:w-10 md:h-10 text-gold "
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
        <img
          src={bestOffer[bestOfferIndex]?.image[0]}
          alt={bestOffer[bestOfferIndex]?.make + " " + bestOffer[bestOfferIndex]?.model}
          className="rounded-xl w-[300px] h-[200px] md:w-[800px] md:h-[400px] lg:w-[650px] lg:h-[400px] m-auto"
        />

        <button onClick={(e) => nextBestOffer()} className="pl-2">
          <svg
            aria-hidden="true"
            className="w-5 h-5 md:w-10 md:h-10 text-gold"
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
      </section>

      <section className="flex flex-col justify-center mt-5 gap-2">
        <h1 className="text-base md:text-xl text-center text-gold">
          € {bestOffer[bestOfferIndex]?.price}{" "}
        </h1>

        <div className="flex flex-col md:flex-row justify-center mt-5">

          <section className="md:p-2 md:px-4 md:border-r-white md:border-r-2 flex flex-col text-center">
            <h1 className="font-light text-gold">Année </h1>
            <h1>
              {bestOffer[bestOfferIndex]?.year}{" "}
            </h1>
          </section>

          <section className="md:p-2 md:px-4 md:border-r-white md:border-r-2 text-center">
            <h1 className="font-light text-gold">
              Kilométrage{" "}
            </h1>
            <h1 >
              {bestOffer[bestOfferIndex]?.mileage}{" "}
            </h1>
          </section>

          <section className="md:p-2 md:px-4 md:border-r-white md:border-r-2 text-center">
            <h1 className="font-light text-gold">
              Carburant{" "}
            </h1>
            <h1>
              {" "}
              {bestOffer[bestOfferIndex]?.fuel}{" "}
            </h1>
          </section>

          <section className="md:p-2 md:px-4 text-center">
            <h1 className="font-light text-gold ">
              Boite de Vitesse{" "}
            </h1>

            <h1>
              {bestOffer[bestOfferIndex]?.transmission}{" "}
            </h1>
          </section>
        </div>
      </section>

      <p className="p-10 xl:px-72 text-center">
        {bestOffer[bestOfferIndex]?.description}
      </p>

      <Link
        to={`/${bestOffer[bestOfferIndex]?._id}`}
        className="text-center"
      >
        <button className="bg-gold p-3 px-5 rounded-lg">VOIR PLUS</button>
      </Link>
    </div>
  );
};

export default BestOffer;
