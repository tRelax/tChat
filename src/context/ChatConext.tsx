import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {getUserChatsApi} from "../views/chat/ChatService";
import {getMessagesApi, sendMessageApi} from "../views/chat/MessageService";
import {MessageInfo} from "../views/chat/MessageInfo";
import {ChatInfo} from "../views/chat/ChatInfo";

export type ChatContextType = {
    userChats: [],
    isUserChatsLoading: boolean,
    userChatsError: string,
    currentChat?: ChatInfo,
    updateCurrentChat: (chat:ChatInfo) => void,
    messages: MessageInfo[],
    isMessagesLoading: boolean,
    messagesError: string,
    sendTextMessage: (currentChatId: string, senderId: string, textMessage: string, setTextMessage: (textMessage:string)=>void) => void,
}

export const ChatContext = createContext<ChatContextType>(
    {
        userChats: [],
        isUserChatsLoading: false,
        userChatsError: "",
        currentChat: undefined,
        updateCurrentChat: () => {},
        messages: [],
        isMessagesLoading: false,
        messagesError: "",
        sendTextMessage: () => {},
    });

const useChat = () => {
    const val = useContext(ChatContext);
    if (!val) {
        throw new Error('ChatConext Provider is required');
    }
    return val;
};

export const ChatContextProvider = ({children, userInfo}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState<MessageInfo[]>(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);

    useEffect(() =>{
        const getUserChats = async () => {
            console.log(userInfo)
            if(userInfo?.id){
                try {
                    setUserChatsError(null);
                    setIsUserChatsLoading(true);
                    const response = await getUserChatsApi(userInfo?.id);
                    setIsUserChatsLoading(false);
                    console.log(response?.data);
                    setUserChats(response?.data)
                } catch (e) {
                    setUserChatsError(e.response?.data);
                    console.log("ERR: ", e.response?.data);
                }
            }
        };
        getUserChats();
    }, [userInfo])

    const updateCurrentChat = useCallback((chat)=>{
        setCurrentChat(chat);
    }, [])

    const sendTextMessage = useCallback((currentChatId, senderId, textMessage, setTextMessage)=>{
        if (!textMessage) return console.log("Type something...")

        console.log("Here")

        const sendMessage = async () => {
            try {
                setSendTextMessageError(null);
                console.log(currentChatId, senderId, textMessage)
                const response = await sendMessageApi(currentChatId, senderId, textMessage);
                setNewMessage(response?.data)
                setMessages((prev) => [...prev, response?.data]);
                setTextMessage("");
            } catch (e) {
                setSendTextMessageError(e.response?.data);
                console.log("ERR: ", e.response?.data);
            }
        };

        void sendMessage();
    }, [])

    useEffect(() => {
        const getMessages = async () => {
            try {
                setIsMessagesLoading(true);
                setMessagesError(null);
                const response = await getMessagesApi(currentChat?._id);
                setIsMessagesLoading(false);
                setMessages(response?.data)
            } catch (e) {
                setMessagesError(e.response?.data);
                console.log("ERR: ", e.response?.data);
            }
        };
        void getMessages();
    }, [currentChat])

    return <ChatContext.Provider value={{
        userChats: userChats,
        isUserChatsLoading: isUserChatsLoading,
        userChatsError: userChatsError,
        currentChat: currentChat,
        updateCurrentChat: updateCurrentChat,
        messages: messages,
        isMessagesLoading: isMessagesLoading,
        messagesError: messagesError,
        sendTextMessage: sendTextMessage,
    }}>
        {children}
    </ChatContext.Provider>
}

export default useChat;