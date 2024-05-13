import {createContext, useContext, useEffect, useState} from "react";
import {getUserChatsApi} from "../views/chat/ChatService";

export type ChatConextType = {
    userChats: [],
    isUserChatsLoading: boolean,
    userChatsError: string;
}

export const ChatConext = createContext<ChatConextType>(
    {
        userChats: [],
        isUserChatsLoading: false,
        userChatsError: "",
    });

const useChat = () => {
    const val = useContext(ChatConext);
    if (!val) {
        throw new Error('ChatConext Provider is required');
    }
    return val;
};

export const ChatContextProvider = ({children, userInfo}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

    useEffect(() =>{
        const getUserChats = async () => {
            console.log(userInfo)
            if(userInfo?.id){
                try {
                    setIsUserChatsLoading(true);
                    setUserChats(null);
                    const response = await getUserChatsApi(userInfo?.id);
                    setIsUserChatsLoading(false);
                    console.log(response?.data);
                    setUserChats(response?.data)
                } catch (e) {
                    setUserChatsError(e.response?.data)
                    console.log("ERR: ", e.response?.data);
                }
            }
        };

        getUserChats();
    }, [userInfo])


    return <ChatConext.Provider value={{
        userChats: userChats,
        isUserChatsLoading: isUserChatsLoading,
        userChatsError: userChatsError
    }}>
        {children}
    </ChatConext.Provider>
}

export default useChat;