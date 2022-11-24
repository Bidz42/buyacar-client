import React, {useState} from 'react'
import axios from 'axios'

const NewTestimonialPost = ({ handleCloseSecondSection, refresh, setRefresh }) => {
  const server = "https://muddy-moth-top-hat.cyclic.app" ;

  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [validateSending, setValidateSending] = useState("");


  const handleNewTestimonial = (e) => {
    e.preventDefault()
    axios
      .post(`${server}/testimonial`, {body, author})
      .then((response) => {
        console.log(response)
        setValidateSending(response.data);
        setRefresh(!refresh)
        setAuthor("")
        setBody("")
      })
      .catch(err => console.log(err))

      return setInterval(() => {
        return setValidateSending("");
    }, 3000);
  }

  return (
    <div className="p-10 flex flex-col w-full h-screen">
      <header className="w-full flex justify-center relative">
        <h1 className="text-3xl text-center mb-5 text-gold">
          Ajouter Un Nouveau Message
        </h1>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer absolute right-80 text-gold mt-2"
          onClick={(e) => handleCloseSecondSection()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </header>

      <form
        className="flex flex-col justify-center mt-10 rounded h-screen"
        onSubmit={(e) => handleNewTestimonial(e)}
      >
        <label for="author" className="text-gold text-lg mb-5">
          Author
        </label>
        <input
          className="p-5"
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
          name="author"
        />
        <label for="body" className="text-gold text-lg my-5">
          Message
        </label>
        <textarea
          className="h-full md:h-80 p-5"
          type="text"
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
}

export default NewTestimonialPost