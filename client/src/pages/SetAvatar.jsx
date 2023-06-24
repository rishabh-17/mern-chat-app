import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loadingImage from "../assets/loading.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import axios from "axios";

export default function SetAvatar() {
  const navigate = useNavigate();

  const image = "https://api.multiavatar.com";
  const [loading, setloading] = useState(false);
  const [selected, setselected] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    theme: "dark",
  };

  const setProfileAvatar = async () => {
    console.log(selected);
    if (selected === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        avatarImage: selected
      });
      if (data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.avatarImage;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate('/')
      }
      else{
        toast.error('Unable to set avatar please try again', toastOptions)
      }

    }
  };

  return (
    <>
      {loading ? (
        <img src={loadingImage} alt="loading" />
      ) : (
        <div className="container text-white border my-5 p-5 rounded-5 justify-content-center">
          <div className="mb-5 text-center">
          <h2>Select your avatar</h2>
          </div>
          <div className="row justify-content-center">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={selected === i ? "selected m-2 col-5 m-sm-4 col-sm-2 " : "m-2 col-5 m-sm-4 col-sm-2 c"}>
              <img
              width={"100px"}
                src={`${image}/${i}.png`}
                alt={`Avatar ${i + 1}`}
                onClick={() => setselected(i)}
                className={selected === i ? "mx-auto d-block border border-5 rounded-circle" : "mx-auto d-block"}
              />
            </div>
            
          ))}
          </div>
          <div class="d-grid gap-2">
          <button className="btn btn-secondary mt-5 fw-bold rounded-5" onClick={setProfileAvatar}>Set as Profile Avatar</button>
        </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
