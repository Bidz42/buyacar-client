import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Filter from "../components/cars/Filter";
import { HashLink } from "react-router-hash-link";

import {HiOutlinePlusCircle, HiOutlineMinusCircle} from "react-icons/hi"


import {TfiLayoutGrid2, TfiLayoutGrid3} from 'react-icons/tfi'
import {BsSquareFill} from 'react-icons/bs'




const Cars = () => {
  const server = process.env.SERVER ;

  const [cars, setCars] = useState([]);

  const [filteredCars, setFilteredCars] = useState([...cars]);

  // Filter
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedMileage, setSelectedMileage] = useState(0);
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("")
  const [selectedMake, setSelectedMake] = useState("")

  
  const [imageListBy, setImageListBy] = useState("")
  
  const [validateSending, setValidateSending] = useState("")
  
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    axios
    .get(`${server}/car`)
    .then((response) => {
    setFilteredCars(response.data)
    setCars(response.data)} )
    .catch((err) => console.log(err));
    
  }, [refresh]);
  
  
      const handlePrice =  (data) => {        
       if(selectedPrice <= 0) return data  
       return data.filter(car => {
         return  Number(selectedPrice) > car.price 
        } )
      
      }
  
      const handleMileage =  (data) => {       
        if(selectedMileage <= 0) return data
        return data.filter(car => {
         return  Number(selectedMileage) > car.mileage 
        } )

      }

      const handleTransmission = (data) => {
        if(selectedTransmission.toLowerCase() === "choose" || !selectedTransmission ) return data
        return data.filter(car =>{
          return selectedTransmission.toLowerCase()  === car.transmission.toLowerCase() 
         })   
      }

      const handleFuel = (data) => {
        if(selectedFuel.toLowerCase() === "choose" || !selectedFuel) return data
        return data.filter(car =>{
          return selectedFuel.toLowerCase()  === car.fuel.toLowerCase() 
         })
      }
     
     
      const handleMake = (data) => {
        if(selectedMake.toLowerCase() === "choose" || !selectedMake) return data
        return data.filter(car =>{
          return selectedMake.toLowerCase()  === car.make.toLowerCase() 
         })
      }
      


  const handleFilter =  (e) => {
    setValidateSending("Recherche")
    new Promise((resolve, reject) => {
      setFilteredCars(cars)
      resolve(cars)
    
    })

    .then(response => handlePrice( response))
    .then(response => handleMileage(response) )
    .then(response => handleTransmission(response))
    .then(response => handleFuel(response))
    .then(response => handleMake(response))
    .then(response => setFilteredCars(response))
    .catch(err => console.log(err))

    return setInterval(() => {
      return setValidateSending("");
    }, 2000);

  }




  
  const reset = () =>{

    setFilteredCars(cars)

    // Resetting Filters
      setSelectedMileage(0)
      setSelectedPrice(0)
      setSelectedFuel("Choose")
      setSelectedTransmission("Choose")
      setSelectedMake("Choose")

    setRefresh(!refresh)

  }


  // Take out List of Makes

  const uniqueMakes = ["Choose"]

  cars.filter( car => {
    const isDuplicate = uniqueMakes.includes(car.make);

    if(!isDuplicate) {
      uniqueMakes.push(car.make)
      return true
    }
    return false
   })
  

  // Arrow Pointer

  const [isVisible, setIsVisible] = useState(true);

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


  // Layout Changer
 const [counter, setCounter] = useState(1)
 console.log(counter)


 useEffect(() => {

    // Various Layout

    const layoutByOne = {
      container: "w-full",
      infoSection: "flex flex-col lg:flex-row justify-center mt-5 gap-2",
      image: "rounded-t-xl h-[175px] sm:h-[220px] md:h-[450px] lg:h-[440px] w-[660px]",
      icon: <BsSquareFill />

    }

    const layoutByTwo = {
      container: "w-full lg:w-1/2",
      infoSection: "flex flex-col lg:flex-row justify-center mt-5 gap-2",
      image: "rounded-t-xl h-[175px] sm:h-[220px] md:h-[450px] lg:h-[440px] w-[660px]",
      icon: <TfiLayoutGrid2 />



    }
   
    const layoutByThree = {
      container: "w-full lg:w-1/3",
      infoSection: "flex flex-col lg:flex-row justify-center mt-5 gap-2",
      image: "rounded-t-xl h-[175px] sm:h-[220px] md:h-[450px] lg:h-[325px] w-[660px]",
      icon: <TfiLayoutGrid3 />

    }

    // Conditionals for Rendering the Layout

    if(counter <= 1 ) return setImageListBy(layoutByOne)
    if(counter > 1 && counter < 3) return setImageListBy(layoutByTwo)
    if(counter >= 3 ) return setImageListBy(layoutByThree)

 },[counter])
  



  return (
    <div>
      {isVisible && (
        <HashLink smooth to="/cars#top">
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

      <div
        id="carGallery"
        className="flex flex-col md:flex-row justify-center m-auto md:flex-wrap p-1 md:p-10"
      >
        <header className="w-full">
         
          <h1 className="text-2xl md:text-5xl text-center m-auto font-bold py-4  text-gold">
             ~ <span className="text-lg md:text-4xl"> Catalogue Complet </span> ~
          </h1>

        


        </header>

      <section className="flex">

        <Filter 
        setSelectedMileage={setSelectedMileage} 
        selectedMileage={selectedMileage} 
        setSelectedPrice={setSelectedPrice} 
        selectedPrice={selectedPrice}
        selectedFuel={selectedFuel}
        setSelectedFuel={setSelectedFuel}
        selectedTransmission={selectedTransmission}
        setSelectedTransmission={setSelectedTransmission}
        reset={reset}
        handleFilter={handleFilter}
        validateSending={validateSending}
        handlePrice={handlePrice}

        selectedMake={selectedMake}
        setSelectedMake={setSelectedMake}
        uniqueMakes={uniqueMakes}
        />
      </section>

      <section className="w-full hidden  lg:flex justify-center gap-5 ">



        <div className="text-white text-3xl cursor-pointer    " onClick={ e => setCounter(prev => prev <= 1 ? prev : prev-1)}>
        <HiOutlineMinusCircle />
        </div>

        <div className=" text-white text-xl mt-1">
        {imageListBy.icon} 
        </div>

        <div className="text-white text-3xl cursor-pointer    " onClick={ e => setCounter(prev => prev >= 3 ? prev : prev+1)} >
        <HiOutlinePlusCircle />
        </div>
      </section>
        

        { filteredCars?.length === 0  && 

        <section className="h-screen w-full mt-10 text-3xl ">
          <h1 className="underline text-center text-red-900 translate-y-40">Aucune Voiture Selectioneé</h1>

        </section>

        }


        {filteredCars?.map((car) => {
          return (

            <div key={car._id} className={`p-2 mb-2 sm:p-5 md:p-10 lg:p-30 ${imageListBy.container} flex justify-center`}>
              <div className="bg-black rounded-xl border border-gold shadow-2xl text-white w-[300px] md:w-[660px]">
                
                <Link to={`/${car._id}`}>
                  <img
                    className={imageListBy.image}
                    src={car.image[0]}
                    alt={car.name}
                  />
                </Link>

                <div className="p-0 sm:p-2 md:p-5">

                  <section className="flex flex-row justify-around sm:mt-2 ">
                    <h5 className="text-base md:text-xl font-bold tracking-tight text-gold">
                      {car.make + " " + car.model}
                    </h5>
                  </section>

                  <section className="flex flex-col justify-center sm:mt-1 md:mt-5 gap-0 md:gap-2">
                    <h1 className="text-base md:text-xl text-center">
                      € {car.price}{" "}
                    </h1>


                    <div className={imageListBy.infoSection}>
                      <section className="px-1 sm:p-2 lg:border-r-white lg:border-r-2 flex flex-col">
                        <h1 className="text-[0.7rem] sm:text-sm font-light md:text-base text-gold">

                          Année{" "}
                        </h1>
                        <h1 className="text-[0.7rem] sm:text-sm md:text-base">{car.year} </h1>
                      </section>

                      <section className="px-1 sm:p-2 lg:border-r-white lg:border-r-2">
                        <h1 className="text-[0.7rem] sm:text-sm md:text-base font-light text-gold">
                          Kilométrage{" "}
                        </h1>
                        <h1 className="text-[0.7rem] sm:text-sm md:text-base">{car.mileage} </h1>
                      </section>

                      <section className="px-1 sm:p-2 lg:border-r-white lg:border-r-2">
                        <h1 className="text-[0.7rem] sm:text-sm md:text-base font-light text-gold">
                          Carburant{" "}
                        </h1>
                        <h1 className="text-[0.7rem] sm:text-sm md:text-base"> {car.fuel} </h1>
                      </section>

                      <section className="px-1 sm:p-2">
                        <h1 className="text-[0.7rem] sm:text-sm md:text-base font-light text-gold">
                          Boite de Vitesse{" "}
                        </h1>

                        <h1 className="text-[0.7rem] sm:text-sm md:text-base">
                          {car.transmission}{" "}

                        </h1>
                      </section>

                    </div>
                  </section>

                  <h5 className="text-[0.6rem] sm:text-xs md:text-base font-bold tracking-tight text-white mt-1 sm:mt-3 md:mt-8 p-1 sm:p-3">
                    {car.description.substr(0, 80) + "..."}

                  </h5>

                  <Link
                    to={`/${car._id}`}
                    className="inline-flex items-center py-2 sm:py-3 px-3 sm:px-4 ml-1 sm:ml-2 mb-1 text-[0.6rem] sm:text-sm font-medium text-center mt-2 md:mt-5 text-white bg-gold rounded-lg hover:bg-gold/90 focus:ring-4 focus:outline-none focus:ring-gold"
                  >
                    See more
                    <svg
                      aria-hidden="true"
                      className="ml-2 -mr-1 w-2 h-2 sm:w-4 sm:h-4 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cars;
