import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const server =  process.env.SERVER ;
 
const AuthContext = createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
 
  const storeToken = (token) => {     
    localStorage.setItem('authToken', token);
  }
  
  const authenticateUser = () => {           
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      axios.get(
        `${server}/admin/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => { 
        const user = response.data;  
        setUser(user);          
        setIsLoggedIn(true);
        setIsLoading(false);   
      })
      .catch((error) => {     
        setUser(null);           
        setIsLoggedIn(false);
        setIsLoading(false); 
      });      
    } else {
        setUser(null);       
        setIsLoggedIn(false);
        setIsLoading(false);
    }   
  }
  
  const removeToken = () => {    
    localStorage.removeItem("authToken");
  }

  const logOutUser = () => {                
    removeToken();
    authenticateUser();
  }  
  
  useEffect(() => {                                    
    authenticateUser();                 
   }, []);

  return (                                                   
    <AuthContext.Provider 
      value={{ 
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser, 
        setUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };