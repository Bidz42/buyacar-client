import React, { useState, useEffect } from "react";
import axios from "axios";
import NewCarPost from "../components/dashboard/main/NewCarPost";
import NewTestimonialPost from "../components/dashboard/main/NewTestimonialPost";
import EditCarPost from "../components/dashboard/main/EditCarPost";
import EditTestimonial from "../components/dashboard/main/EditTestimonial";
import EditContact from "../components/dashboard/main/EditContact";
import DashboardSidebar from "../components/dashboard/sidebar/DashboardSidebar";
import EditFooter from "../components/dashboard/main/EditFooter";

import {AiTwotonePhone} from "react-icons/ai"


const Dashboard = () => {
  const server = "https://muddy-moth-top-hat.cyclic.app" ;

  const [cars, setCars] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contact, setContact] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [visible, setVisible] = useState("flex");
  const [contentAside, setContentAside] = useState("Cars");

  // Retreive All Data
  useEffect(() => {
    axios
      .get(`${server}/car`)
      .then((response) => setCars(response.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    axios
      .get(`${server}/testimonial`)
      .then((response) => setTestimonials(response.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    axios
      .get(`${server}/contact`)
      .then((response) => setContact(response.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  // Show and Hide based on vector click (+ and x)
  // Handle New Car and Edit visibility
  const handleShowAside = async (e, choice, id) => {
    
    // Reset Default Value
    await setSelected("");

    choice === "New Post" ? setSelected("New Post") : setVisible("hidden");
    choice === "New Testimonial" ? setSelected("New Testimonial") : setVisible("hidden");
    choice === "Edit" ? setSelected("Edit") : setVisible("hidden");
    choice === "Edit Testimonial" ? setSelected("Edit Testimonial") : setVisible("hidden");
    choice === "Edit Contact" ? setSelected("Edit Contact") : setVisible("hidden");

    setSelectedId(id);
    setVisible("hidden");
    
  };

  const handleCloseSecondSection = (e) => {
    setSelected("");
    setVisible("flex");

    if(contentAside === "Phone") return setContentAside("Cars") 
  };


  return (
    <div className="pb-30" >
      <h1 className="text-center p-5 text-base md:text-lg lg:text-xl  text-gold font-bold">
        Tableau de Bord
      </h1>

      <section className="flex gap-2 md:gap-5 justify-center lg:justify-start my-2 mx-4 md:m-2">
        <h2
          className=" text-base md:text-lg lg:text-xl text-gold font-bold cursor-pointer border-gold border-2 p-2 rounded-lg"
          onClick={(e) => setContentAside("Cars")}
        >
          Voitures
        </h2>
        <h2
          className=" text-base md:text-lg lg:text-xl text-gold font-bold cursor-pointer border-gold border-2 p-2 rounded-lg"
          onClick={(e) => setContentAside("Testimonial")}
        >
          Temoniages
        </h2>
        <h2
          className=" text-base md:text-lg lg:text-xl text-gold font-bold cursor-pointer border-gold border-2 p-2 rounded-lg"
          onClick={(e) => setContentAside("Messages")}
        >
          Contactes
        </h2>
        
        <h2
          className=" hidden md:flex md:text-lg lg:text-xl text-gold font-bold cursor-pointer border-gold border-2 p-2 rounded-lg"
          onClick={(e) => setContentAside("Phone")}
        >
          Numero d'Appelle 
        </h2>

        <h2
          className=" md:hidden text-gold font-bold cursor-pointer border-gold border-2 p-2 rounded-lg"
          onClick={(e) => setContentAside("Phone")}
        >
         <AiTwotonePhone />
        </h2>

      </section>

      <div className="flex">
       
       { contentAside !== "Phone" &&

        <aside
          className={`w-full px-3 md:w-3/6 mx-auto lg:m-0 lg:w-1/3 border-black border-t-2 md:pr-4 md:overflow-y-scroll h-screen ${visible} md:flex flex-col`}
        >
          <DashboardSidebar
            handleShowAside={handleShowAside}
            cars={cars}
            testimonials={testimonials}
            contact={contact}
            contentAside={contentAside}
          />
        </aside>

       }
{/* ${contentAside === "Phone" ? "w-screen block" : "md:w-4/6" } */}
{contentAside !== "Phone" && 
        <section
        className={`border-black border-t-2 m-auto md:m-0 text-black 
        ${visible === "hidden" ? "flex" : "hidden"} 
        
        md:w-full md:flex justify-center `}
        >
          
          {selected === "New Post" && (
            <NewCarPost
            handleCloseSecondSection={handleCloseSecondSection}
            refresh={refresh}
            setRefresh={setRefresh}
            />
            )}

          {selected === "New Testimonial" && (
            <NewTestimonialPost
            handleCloseSecondSection={handleCloseSecondSection}
            refresh={refresh}
            setRefresh={setRefresh}
            />
            )}

          {/* Edit Section */}

          {selected === "Edit" && (
            <EditCarPost
            handleCloseSecondSection={handleCloseSecondSection}
            selectedId={selectedId}
            refresh={refresh}
            setRefresh={setRefresh}
            cars={cars}
            />
            )}

          {selected === "Edit Testimonial" && (
            <EditTestimonial
            handleCloseSecondSection={handleCloseSecondSection}
            refresh={refresh}
            setRefresh={setRefresh}
            selectedId={selectedId}
            testimonials={testimonials}
            />
            )}

          {selected === "Edit Contact" && (
            <EditContact
            handleCloseSecondSection={handleCloseSecondSection}
            refresh={refresh}
            setRefresh={setRefresh}
            selectedId={selectedId}
              contact={contact}
            />
            )}

        </section>
    }
    
    { contentAside === "Phone" && 
    <section
        className={'border-black border-t-2 m-auto md:m-0 text-black md:flex justify-center w-full'}
        >
            <EditFooter
            refresh={refresh}
            setRefresh={setRefresh}
            handleCloseSecondSection={handleCloseSecondSection}
            
            />
        </section>
            }
    
    
      </div>
    </div>
  );
};
export default Dashboard;
