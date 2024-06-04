export type MessageInfo = {
    _id: string,
    chatId: string,
    senderInfo: {
        senderId: string,
        senderUsername: string,
        senderImageId: string,
    },
    text: string,
    createdAt: Date,
    updatedAt: Date
}