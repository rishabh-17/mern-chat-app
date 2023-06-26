import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect( () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      async function setUser(){
          setCurrentUser(
        await JSON.parse(
            localStorage.getItem("chat-app-user")
          )
        );
      }
      setUser();
      
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);



  useEffect( () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        async function fetchData(){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)  
          setContacts(data.data);
        }
        fetchData()    
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
        <div className='chat justify-content-center align-items-center d-flex'>
    <div className='chat-container text-white row'>
      <div className="col-3 border-end">
          <Contacts contacts={contacts} changeChat={handleChatChange} className="col-3 border" />
          </div>
          {currentChat === undefined ? (
            <div className="col-6">
            <h2 >Welcome</h2>
            </div>
          ) : ( 
            <div className="col-9">
            <ChatContainer currentChat={currentChat} socket={socket} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
