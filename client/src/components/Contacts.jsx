import React, { useState, useEffect } from "react";

import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
    const image = "https://api.multiavatar.com";
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect( () => {
    async function setUserData(){

        const data = JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
    }
    setUserData();
    }, []);
  const changeCurrentChat = (index, contact) => {
    console.log(index,contact);
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <div >
      {currentUserImage && currentUserImage && (
        <div className="">
          <div className="d-flex p-2">
            <img src={Logo} alt="logo" width={"70px"}/>
            <h2>ChatJet</h2>
          </div>
          <div className=" ">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact d-flex p-2 gap-3 my-1 ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`${image}/${contact.avatarImage}.png`}
                      alt=""
                      width={"50px"}
                      className="rounded contact-image"
                    />
                  </div>
                  <div className="username justify-content-center align-items-center ">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user d-flex gap-4 border-top pt-3">
            <div className="avatar ">
              <img
                src={`${image}/${currentUserImage}.png`}
                alt="avatar"
                width={"50px"}
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
