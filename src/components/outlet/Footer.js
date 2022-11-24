import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const server = "http://localhost:5005" ;
  const [number, setNumber] = useState(0)
  
  useEffect(() => {
    axios.get(`${server}/admin/number`)
      .then(response => setNumber(response.data) )
      .catch(err => console.log(err))
  }, [])


  return (

    <footer className="p-0 h-10 bg-black fixed bottom-0 w-full text-xs md:text-base flex flex-col md:flex-row items-center md:justify-between md:p-6">
      <ul className="flex flex-wrap items-center mt-3 md:mt-0 text-white">
        <li>
          <span className="mr-1 text-center">
            N'hésitez pas à me contacter au{" "}
          </span>
        </li>
        <li className="flex ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="gold"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mx-2 w-4 h-4 mt-1 md:mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          <span className="hover:underline md:mr-6 mt-0.5 font-semibold text-gold">
           {number}
          </span>
        </li>
      </ul>
      <span className="text-sm text-white sm:text-center hidden md:block">
        © 2022{" "}
        <Link to="/" className="hover:underline">
          P&P Exclusive Cars
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
