import useAuth from "../context/Auth/AuthContext";
import useChat from "../context/Chat/ChatConext";
import {Home} from "../views/Home";
import {Avatar} from "primereact/avatar";
import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import InputEmojiWithRef from "react-input-emoji";
import {Button} from "primereact/button";

const ChatBox = () => {
    const messagesRef = useRef<HTMLDivElement>(null);
    const user = useAuth().authInfo.info;
    const { currentChat, messages, isMessagesLoading, sendTextMessage } = useChat();

    const [textMessage, setTextMessage] = useState("");

    function handleScrollToBottom() {
        if(!messagesRef.current) return;

        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }

    useEffect(() => { handleScrollToBottom() }, [messages])

    // console.log("current chat : ", currentChat)
    if(isMessagesLoading) return <p>Loading messages</p>

    if(!currentChat) return <Home/>

    return (
        <div className="chat-box flex flex-column align-items-start">
            <div className="chat-box-skeleton p-sidebar flex-10">
                <h2 className="chat-box-title">{currentChat._id}</h2>
            </div>

            <div ref={messagesRef} className="flex flex-column chat-box-skeleton flex-1 sticky">
                {messages && messages.map((message, index) => {
                    return <div className="flex chat-box-skeleton mt-2 mb-2 pl-3 pr-3" key={index}>
                        <Avatar
                            size="large"
                            className="profile select-none"
                            icon="pi pi-user"
                            // image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                            shape="circle"
                        />
                        <div className="flex chat-box-skeleton flex-column justify-content-evenly pl-3">
                            <div className="flex chat-box-skeleton mb-0 align-items-start ">
                                <h4 className="m-0">{message?.senderInfo.senderUsername}</h4>
                                <p className="mt-1 mb-0 ml-2 chat-box-message-sent-at">{moment(message?.createdAt).calendar()}</p>
                            </div>
                            <div className="m-0 chat-box-message">
                                {message?.text}
                            </div>
                        </div>
                    </div>
                    }
                )}
            </div>
            <div className="flex chat-box-skeleton p-sidebar flex-10">
                <InputEmojiWithRef value = {textMessage} onChange = {setTextMessage} borderColor="rgba(72,112,223,0.2)" onEnter={()=>{sendTextMessage(currentChat!._id, user.id, textMessage, setTextMessage)}} />
                <Button
                    size="large"
                    rounded
                    icon={"pi pi-send"}
                    onClick={() => sendTextMessage(currentChat!._id, user.id, textMessage, setTextMessage)}
                >

                </Button>
            </div>
        </div>
    )
}

export default ChatBox;