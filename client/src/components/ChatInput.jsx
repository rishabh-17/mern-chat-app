import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
    <div className="row ">
       <div className="button-container col-1 ">
        <div className="emoji btn btn-info py-2 px-4" onClick={handleEmojiPickerhideShow}>
          <BsEmojiSmileFill />
          {showEmojiPicker && <div className=""><Picker onEmojiClick={handleEmojiClick} /></div>}
        </div>
      </div>
      <div className="col-11">
      <form className="form input-container " onSubmit={(event) => sendChat(event)}>
        
        <div className="row">
       
        <div className="col-11">
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="form-control "

        /></div>
        <div className="col-1">
        <button type="submit" className="btn btn-info">
          <IoMdSend />
        </button>
        </div></div>
      </form></div>
      </div>
    </>
  );
}
