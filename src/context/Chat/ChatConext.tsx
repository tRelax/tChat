import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {getUserChatsApi} from "../../views/chat/ChatService";
import {getMessagesApi, sendMessageApi} from "../../views/chat/MessageService";
import {MessageInfo} from "../../views/chat/MessageInfo";
import {ChatInfo} from "../../views/chat/ChatInfo";
import {io} from "socket.io-client";
import chat from "../../views/chat/Chat";


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

export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState<MessageInfo[]>(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // console.log(onlineUsers)

    //initial socket
    useEffect(() => {
        if(!user.authenticated) return;
        const newSocket = io(import.meta.env.VITE_SOCKET_SERVER_URL, { transports : ['websocket'] });
        //console.log(newSocket)
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user])

    //get online users
    useEffect(()=>{
        if(socket === null) return;
        //console.log(socket, userInfo?.id)
        socket.emit("addNewUser", user?.info.id)
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        })
    },[socket])

    //send message
    // useEffect(()=>{
    //     if(socket === null) return;
    //
    //     const recipientId = currentChat?.members?.find((id) => id !== user?.info.id)
    //
    //     socket.emit("sendMessage", {...newMessage, recipientId})
    // },[newMessage])

    //send message to room
    useEffect(()=>{
        if(socket === null) return;

        socket.emit("sendMessageToRoom", {...newMessage})
    },[newMessage])

    //recieve message and add user to room
    useEffect(()=>{
        if(socket === null) return;

        socket.on("getMessage", res => {
            console.log("recieveing message on", user.info.id);
            console.log("INFO:", currentChat?._id, res.chatId);
            if(currentChat?._id !== res.chatId) return;

            setMessages((prev) => [...prev, res]);
        });

        socket.emit("addUserToRoom", {userId: user?.info.id}, {chatId: currentChat?._id});

        return () => {
            socket.off("getMessage");
        }
    },[socket, currentChat])

    useEffect(() =>{
        const getUserChats = async () => {
            //console.log(userInfo)
            if(user?.info.id){
                try {
                    setUserChatsError(null);
                    setIsUserChatsLoading(true);
                    const response = await getUserChatsApi(user?.info.id);
                    setIsUserChatsLoading(false);
                    //console.log(response?.data);
                    setUserChats(response?.data)
                } catch (e) {
                    setUserChatsError(e.response?.data);
                    console.log("ERR: ", e.response?.data);
                }
            }
        };
        getUserChats();
    }, [user])

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