import MessageType from "./MessageType";


interface Message {
    type: MessageType;
    content: string;
    reference?: string;
}

export default Message;