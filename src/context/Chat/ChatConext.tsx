import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {getUserChatsApi} from "../../services/ChatService";
import {getMessagesApi, sendMessageApi} from "../../services/MessageService";
import {MessageInfo} from "../../common/types/MessageInfo";
import {ChatInfo} from "../../common/types/ChatInfo";
import {io, Socket} from "socket.io-client";


export type ChatContextType = {
    userChats: ChatInfo[],
    setUserChats: (value: (((prevState: ChatInfo[]) => ChatInfo[]) | ChatInfo[])) => void,
    isUserChatsLoading: boolean,
    userChatsError: string,
    currentChat?: ChatInfo,
    updateCurrentChat: (chat?: ChatInfo) => void,
    messages: MessageInfo[],
    isMessagesLoading: boolean,
    messagesError: string,
    sendTextMessage: (currentChatId: string, senderId: string, textMessage: string, setTextMessage: (textMessage: string) => void) => void,
}

export const ChatContext = createContext<ChatContextType>(
    {
        userChats: [],
        setUserChats: () => {
        },
        isUserChatsLoading: false,
        userChatsError: "",
        currentChat: undefined,
        updateCurrentChat: () => {
        },
        messages: [],
        isMessagesLoading: false,
        messagesError: "",
        sendTextMessage: () => {
        },
    });

const useChat = () => {
    const val = useContext(ChatContext);
    if (!val) {
        throw new Error('ChatConext Provider is required');
    }
    return val;
};

export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState<ChatInfo[]>(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [currentChat, setCurrentChat] = useState<ChatInfo>(null);
    const [messages, setMessages] = useState<MessageInfo[]>(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [newMessage, setNewMessage] = useState<MessageInfo>(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [socket, setSocket] = useState<Socket>(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    //initial socket
    useEffect(() => {
        if (!user.authenticated) return;
        const newSocket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {transports: ['websocket']});
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user])

    //get online users
    useEffect(() => {
        if (socket === null || !user?.authenticated) return;
        socket.emit("addNewUser");
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });
    }, [socket])

    //send message to room
    useEffect(() => {
        if (socket === null || !user?.authenticated) return;

        socket.emit("sendMessageToRoom", {...newMessage});
    }, [newMessage])

    //recieve message and add user to room
    useEffect(() => {
        if (socket === null || !user?.authenticated) return;

        socket.on("getMessage", res => {
            if (currentChat?._id !== res.chatId) return;

            setMessages((prev) => [...prev, res]);
        });

        socket.emit("addUserToRoom", {chatId: currentChat?._id});

        return () => {
            socket.off("getMessage");
        }
    }, [socket, currentChat])

    useEffect(() => {
        const getUserChats = async () => {
            if (!user?.authenticated) return;
            if (user?.info.id) {
                try {
                    setUserChatsError(null);
                    setIsUserChatsLoading(true);
                    const response = await getUserChatsApi(user?.info.id);
                    setIsUserChatsLoading(false);
                    setUserChats(response?.data);
                } catch (e) {
                    setUserChatsError(e.response?.data);
                    console.log("ERR: ", e.response?.data);
                }
            }
        };
        getUserChats();
    }, [user])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, [])

    const sendTextMessage = useCallback((currentChatId, senderId, textMessage, setTextMessage) => {
        if (!textMessage) return console.log("Type something...")

        const sendMessage = async () => {
            try {
                setSendTextMessageError(null);
                const response = await sendMessageApi(currentChatId, senderId, textMessage);
                setNewMessage(response?.data)
                //setMessages((prev) => [...prev, response?.data]);
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
            if (!user?.authenticated || !currentChat) return;
            try {
                setIsMessagesLoading(true);
                setMessagesError(null);
                const response = await getMessagesApi(currentChat._id);
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
        setUserChats: setUserChats,
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