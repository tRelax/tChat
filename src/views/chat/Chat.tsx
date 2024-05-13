import useChat from "../../context/ChatConext";

const Chat = () => {

    const { userChats, isUserChatsLoading, userChatsError} = useChat();

    console.log(`UserChats: ${userChats}`);

    return (
        <>chat</>
    );
}

export default Chat;