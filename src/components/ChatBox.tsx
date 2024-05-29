import useAuth from "../context/Auth/AuthContext";
import useChat from "../context/Chat/ChatConext";
import {Home} from "../views/Home";
import {Avatar} from "primereact/avatar";
import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import InputEmojiWithRef from "react-input-emoji";
import {Button} from "primereact/button";
import {Tooltip} from "primereact/tooltip";
import {toast} from "react-toastify";

const ChatBox = () => {
    const messagesRef = useRef<HTMLDivElement>(null);
    const auth = useAuth();
    const user = auth.authInfo.info;
    const {
        currentChat,
        messages,
        isMessagesLoading,
        sendTextMessage
    } = useChat();

    const [textMessage, setTextMessage] = useState("");

    function handleScrollToBottom() {
        if (!messagesRef.current) return;

        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }

    const copyFunctionality = () => {
        const codeToCopy: string | undefined = currentChat?.code;
        navigator.clipboard.writeText(codeToCopy ? codeToCopy : "undefined_code");
        toast.success('Link copied!', {
            autoClose: 2000,
        });
    }

    useEffect(() => {
        handleScrollToBottom()
    }, [messages])

    // console.log("current chat : ", currentChat)

    if (!currentChat) return <Home/>

    if (isMessagesLoading && auth.authInfo.authenticated) return <p>Loading messages</p>

    return (
        <div className="chat-box flex flex-column align-items-start">
            <div className="chat-box-skeleton p-sidebar flex-10 flex">
                <h2 className="chat-box-title">
                    {currentChat.name ? currentChat.name : currentChat._id}
                    <Tooltip target={".copy-title"}/>
                    <Avatar
                        className="copy-title ml-1"
                        onClick={() => {
                            copyFunctionality()
                        }}
                        style={{background: "none"}}
                        icon="pi pi-copy"
                        data-pr-tooltip="Copy link"
                        data-pr-position="right"/>
                </h2>
            </div>

            <div ref={messagesRef}
                 className="flex flex-column chat-box-skeleton flex-1 sticky">
                {messages && messages.map((message, index) => {
                        return <div
                            className="flex chat-box-skeleton mt-2 mb-2 pl-3 pr-3"
                            key={index}>
                            <Avatar
                                size="large"
                                className="profile select-none"
                                icon="pi pi-user"
                                // image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                                shape="circle"
                            />
                            <div
                                className="flex chat-box-skeleton flex-column justify-content-evenly pl-3">
                                <div
                                    className="flex chat-box-skeleton mb-0 align-items-start ">
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
            <div
                className="flex chat-box-skeleton p-sidebar flex-10 align-items-center">
                <InputEmojiWithRef
                    value={textMessage}
                    onChange={setTextMessage}
                    borderColor="rgba(72,112,223,0.2)"
                    onEnter={() => {
                        sendTextMessage(currentChat!._id, user.id, textMessage, setTextMessage)
                    }}/>
                <Button
                    style={{width: "2.25rem", height: "2.25rem"}}
                    className="mb-1 mr-1"
                    size="medium"
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