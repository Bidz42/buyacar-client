import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EditContact = ({
  contact,
  selectedId,
  handleCloseSecondSection,
  refresh,
  setRefresh,
}) => {
  const server = "https://muddy-moth-top-hat.cyclic.app" ;
  const chosenMessage = contact.filter((message) => message._id === selectedId);
  const [enabled, setEnabled] = useState(chosenMessage[0].status);

  const handleEdit = async (e) => {
    setEnabled(!enabled);

    await axios
      .put(
        `${server}/contact/${chosenMessage[0]._id}`,
        enabled ? "unread" : "read"
      )
      .then((response) => {
        console.log(response);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${server}/contact/${chosenMessage[0]._id}`)
      .then((response) => {
        console.log(response);
        handleCloseSecondSection()
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  };

  console.log(chosenMessage[0]);

  return (
    <div className="flex flex-col text-gold w-full text-base md:text-lg lg:text-xl p-10">
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
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            readOnly
          />
          <div
            onClick={(e) => {
              handleEdit(e);
            }}
            className="w-11 h-6 bg-red-600 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
          <span className="ml-2 text-base font-medium text-gold">
            {enabled === true ? "Read" : "Unread"}
          </span>
        </label>
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

      <header className="flex justify-center my-5">
        <h1>
          Message posted by:{" "}
          <span className="text-white">
            {chosenMessage[0].name} {chosenMessage[0].lastName}
          </span>
        </h1>
      </header>

      <section className="flex flex-row border-b-2 border-gold justify-evenly p-4">
        <p>
          Téléphoner:{" "}
          <span className="text-white">{chosenMessage[0].phone}</span>
        </p>
        <p>
          Email: <span className="text-white">{chosenMessage[0].email}</span>
        </p>
      </section>

      <main className="flex flex-col flex-wrap mx-auto p-4">
        <Link to={`/${chosenMessage[0].carId}`}>
        <p className="py-4">
          Subject:{" "}
          <span className="text-white">{chosenMessage[0].subject}</span>
        </p>
        </Link>
        <p className="text-white">{chosenMessage[0].message}</p>
      </main>
    </div>
  );
};

export default EditContact;
