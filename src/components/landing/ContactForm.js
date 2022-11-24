import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  // states for Contact Form

  const [contactName, setContactName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const [validateSending, setValidateSending] = useState("");

  const handleContact = (e) => {
    e.preventDefault();

    const fileContact = {
      contactName,
      contactLastName,
      contactEmail,
      contactPhone,
      contactSubject,
      contactMessage,
    };

    axios
      .post("http://localhost:5005/contact", fileContact)
      .then((response) => {
        console.log(response.data);
        setValidateSending(response.data);
      })
      .catch((err) => console.log(err));

    return setInterval(() => {
      return setValidateSending("");
    }, 6000);
  };

  return (
    <div className="py-40 px-5 sm:px-7 h-fit">
      <h1 className="text-2xl md:text-5xl text-center m-auto font-bold py-4 text-gold">
        ~ <span className="text-lg md:text-4xl"> Contactez moi </span> ~
      </h1>

      <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 my-12 bg-black border-2 border-gold rounded-3xl text-xs sm:text-base md:text-xl">
        <form action="" onSubmit={handleContact}>
          <div className="md:flex items-center mt-12  ">
            <div className="w-full md:w-1/2 flex flex-col">
              <label className="font-semibold leading-none text-gold ">
                Prenom
              </label>
              <input
                required
                type="text"
                className="leading-none p-3 mt-4 bg-white rounded-2xl"
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label className="font-semibold leading-none text-gold">
                Nom
              </label>
              <input
                required
                type="text"
                className="leading-none p-3 mt-4 bg-white rounded-2xl"
                onChange={(e) => setContactLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex items-center mt-4  ">
            <div className="w-full md:w-1/2 flex flex-col">
              <label className="font-semibold leading-none text-gold ">
                Email
              </label>
              <input
                required
                type="email"
                className="leading-none p-3 mt-4 bg-white rounded-2xl"
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label className="font-semibold leading-none text-gold">
                Numero
              </label>
              <input
                required
                type="text"
                className="leading-none p-3 mt-4 bg-white rounded-2xl"
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex items-center mt-8">
            <div className="w-full flex flex-col">
              <label className="font-semibold leading-none text-gold">
                Sujet
              </label>
              <input
                required
                type="text"
                className="leading-none p-3 mt-4 bg-white rounded-2xl"
                onChange={(e) => setContactSubject(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="w-full flex flex-col mt-8">
              <label className="font-semibold leading-none text-gold">
                Message
              </label>
              <textarea
                required
                type="text"
                className="h-40 text-base leading-none p-3 mt-4 bg-white rounded-2xl"
                onChange={(e) => setContactMessage(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="flex items-center align-center justify-center w-full">
            <button
              type="submit"
              className="bg-gold hover:bg-gold/70 rounded w-1/2 md:w-1/4 mt-7 mb-10 m-auto text-white py-2"
            >
              {validateSending || "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
