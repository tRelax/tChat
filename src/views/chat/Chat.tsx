import useChat from "../../context/ChatConext";
import useAuth from "../../context/AuthContext";
import UserChat from "../../components/UserChat";
import ChatBox from "../../components/ChatBox";

const Chat = () => {
    const user = useAuth().authInfo.info;
    const { userChats, isUserChatsLoading, updateCurrentChat} = useChat();

    //console.log(`UserChats: ${user}`);

    return (
            <div gap={3}>
                {isUserChatsLoading && <p>Loading chats...</p>}
                {userChats?.map((chat, index) => {
                    return (
                      <div key={index} onClick={() => updateCurrentChat(chat)}>
                          <UserChat chat={chat} user={user}></UserChat>
                      </div>
                    );
                })}
                <ChatBox/>
            </div>

    );
}

export default Chat;