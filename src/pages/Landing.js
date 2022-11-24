import React, { useState, useEffect } from "react";
import Header from "../components/landing/Header";
import BestOffer from "../components/landing/BestOffer.js";
import Testimonial from "../components/landing/Testimonial";
import ContactForm from "../components/landing/ContactForm";
import axios from "axios";
import { HashLink } from "react-router-hash-link";
import OtherOffers from "../components/landing/OtherOffers";

const Landing = () => {
  const server = "http://localhost:5005" ;
  const [cars, setCars] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    axios
      .get(`${server}/car`)
      .then((response) => setCars(response.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listenToScroll = () => {
    let hideTill = 200;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > hideTill) {
      isVisible && setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <div>
      {isVisible && (
        <HashLink smooth to="/#top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="hidden md:block mb-3 lg:mb-0 w-10 h-10 bottom-10 right-1 lg:bottom-20 lg:right-10 fixed text-gold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </HashLink>
      )}

      <Header />
      <BestOffer />
      <OtherOffers cars={cars} />
      <Testimonial />
      <ContactForm />
    </div>
  );
};

export default Landing;
