import React, { useState, useEffect } from "react";
import { navigate } from "react-router-dom";
import loadingImage from "../assets/loading.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SetAvatar() {
  const image = "https://api.multiavatar.com";
  const [loading, setloading] = useState(false);
  const [selected, setselected] = useState(undefined);


  const toastOptions = {
    position: "bottom-right",
    theme: "dark"
  }


  const setProfileAvatar = async() => {
    console.log(selected);
    if (selected=== undefined){
      toast.error("Please select an avatar", toastOptions)
    }
    else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user");) 
    }
    const { data } = await axios.post("")
  }

  return (
    <>
      {loading ? (
        <img src={loadingImage} alt="loading" />
      ) : (
        <div className="container">
          <h2>Select your avatar</h2>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={selected === i ? "selected" : ""}>
              <img
                
                src={`${image}/${i}.png`}
                alt={`Avatar ${i + 1}`}
                onClick={() => setselected(i)}
              />
            </div>
          ))}
          <button onClick={setProfileAvatar} >Set as Profile Avatar</button>
        </div>
      )}
      <ToastContainer />  
    </>
  );
}
