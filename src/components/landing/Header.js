import React from "react";
import bg from "../../assets/p_pVF.png";

const Header = () => {
  return (
    <div className="h-full">
      <div className=" w-full h-1/4 md:h-full px-3 md:px-0">
        <img src={bg} alt="logo" className="mt-20" />
        <div className="flex flex-col justify-center w-full md:w-3/4 m-auto h-screen text-center text-white">
          <div className="rounded-2xl p-2 h-2/4 flex flex-col justify-center">
            <h1 className="p-2 text-base sm:text-xl md:text-5xl font-bold">
              Welcome to P&P Exclusive Cars
            </h1>
            <h4 className="p-2 text-sm sm:text-base md:text-xl lg:text-2xl my-5">
            Nous vous offrons un service de haute qualité avec un accompagnement de A à Z sur des véhicules haut de gamme
            <br></br>
            P&P Exclusive Car s'engage à être au plus proche de ses clients, répondre à leurs demandes et attentes les plus élevées en dénichant des véhicules à prix d'or.
 

            </h4>
            <p className="p-2 text-[0.6rem] sm:text-sm md:text-xl lg:text-lg">
            
            Il s'agit d'un accompagnement personnalisé qui se construit en toute confiance.
            
            <br />
            
            Nos services vous permettent à la fois de déposer votre véhicule puis trouver un acheteur, de le racheter directement ou encore de vous proposer des véhicules de qualité à des prix imbattables avec les meilleures options qui vous correspondent.
  
            <br />

           Notre connaissance du marché, notre passion pour l'automobile et la relation humaine avec nos clients sont notre moteur pour vous offrir un service premium et une expérience unique.
            
            <br />
  
            N'hésitez pas à prendre contact avec nous et réserver un rendez-vous pour que nous puissions nous rencontrer. 

 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
