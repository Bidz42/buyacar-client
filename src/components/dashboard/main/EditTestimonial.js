import React, { useState } from "react";
import axios from "axios";

const EditTestimonial = ({
  testimonials,
  selectedId,
  handleCloseSecondSection,
  refresh,
  setRefresh,
}) => {
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [validateSending, setValidateSending] = useState("");
  const server = process.env.SERVER ;

  //Edit a testiomonial
  const handleTestimonialEdit = (e, id) => {
    e.preventDefault();
    axios
      .put(`${server}/testimonial/${id}`, { body, author })
      .then((response) => {
        setRefresh(!refresh);
        console.log(response);
        setValidateSending(response.data);
      })
      .catch((err) => console.log(err));

      return setInterval(() => {
        return setValidateSending("");
    }, 3000);
  };

  //Delete a testiomonial
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${server}/testimonial/${selectedId}`)
      .then((res) => {
        setRefresh(!refresh);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const chosenTestimonial = testimonials.filter(
    (testimonial) => testimonial._id === selectedId
  );

  return (
    <div className="p-10 flex flex-col w-full h-screen">
      <header className="w-full">
        <h1 className="text-3xl text-center mb-5 text-gold">
          Modifier la feuille de message
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

      <form
        className="flex flex-col justify-center mt-5 rounded h-screen"
        onSubmit={(e) => handleTestimonialEdit(e, selectedId)}
      >
        <label for="author" className="text-gold text-lg mb-5">
          Author
        </label>
        <input
          className="p-5"
          type="text"
          defaultValue={chosenTestimonial[0]?.author}
          onChange={(e) => setAuthor(e.target.value)}
          name="author"
        />
        <label for="body" className="text-gold text-lg my-5">
          Message
        </label>
        <textarea
          className="h-full md:h-80 p-5"
          type="text"
          defaultValue={chosenTestimonial[0]?.body}
          onChange={(e) => setBody(e.target.value)}
          name="body"
        />

        <button
          type="submit"
          className="bg-gold hover:bg-gold/70 rounded w-1/2 md:w-1/4 mt-3 mb-20 m-auto text-white py-2"
        >
          {validateSending || "Envoyer"}
        </button>
      </form>
    </div>
  );
};

export default EditTestimonial;
