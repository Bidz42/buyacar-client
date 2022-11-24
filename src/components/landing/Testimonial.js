import React, { useState, useEffect } from "react";
import axios from "axios";

const Testimonial = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  const server = "http://localhost:5005" ;

  useEffect(() => {
    axios
      .get(`${server}/testimonial`)
      .then((response) => setTestimonials(response.data))
      .catch((err) => console.log(err));
  },[]);

  const nexTestimonial = () => {
    const endArray = testimonials.length;
    const next = testimonialIndex + 1 === endArray ? 0 : testimonialIndex + 1;
    setTestimonialIndex(next);
  };

  const previousTestimonial = () => {
    const endArray = testimonials.length;
    const prev = testimonialIndex <= 0 ? endArray - 1 : testimonialIndex - 1;
    console.log(prev, endArray, testimonialIndex);
    setTestimonialIndex(prev);
  };

  return (
    <div>
    {testimonials &&
    <div
      className="flex flex-col text-white h-screen justify-center items-center mx-0 lg:mx-40"
      id="temoniage"
    >

      
       <h1 className="text-lg md:text-4xl text-center font-bold text-gold mb-10">
        ~ <span>Témoignages</span> ~
      </h1>

      <section className="flex flex-row ">
        <svg
          aria-hidden="true"
          className="h-4 w-4 sm:w-8 sm:h-8 text-gold md:w-1/6 my-auto cursor-pointer "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={(e) => previousTestimonial()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>

        <section
          key={testimonials[testimonialIndex]?._id}
          className="flex flex-col w-4/6 m-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="fill-gold w-1/6"
          >
            <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
          </svg>
          <p className="text-[0.7rem] sm:text-sm md:text-xl">
            {testimonials[testimonialIndex]?.body}
          </p>

          <aside className="flex justify-end">
            <h2 className="text-lg md:text-3xl font-semibold">
              - {testimonials[testimonialIndex]?.author}
            </h2>
          </aside>
        </section>

        <svg
          aria-hidden="true"
          className="h-4 w-4 sm:w-8 sm:h-8 text-gold my-auto  md:w-1/6 cursor-pointer  "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={(e) => nexTestimonial()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </section>
    </div>
}
</div>
  );
};

export default Testimonial;
