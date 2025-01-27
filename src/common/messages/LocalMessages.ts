import Message from "./Message";
import MessageType from "./MessageType";


export const logoutSuccessMessage: Message = {
    type: MessageType.INFO,
    content: 'Successfully logged out'
};

export const loginSuccessMessage: Message = {
    type: MessageType.SUCCESS,
    content: 'Successfully logged in'
};

export const tokenExpiredMessage: Message = {
    type: MessageType.WARN,
    content: 'Session expired, please log in again'
};

export const userDeactivatedMessage: Message = {
    type: MessageType.SUCCESS,
    content: 'User successfully deactivated'
};

export const linkCopiedSuccess: Message = {
    type: MessageType.SUCCESS,
    content: 'Link copied successfully!'
};

export const linkCopiedError: Message = {
    type: MessageType.ERROR,
    content: 'Failed to copy the link'
};