'use server';
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";


async function addMessage(previousState, formData) {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const recipient = formData.get('recipient');

    const { userId } = sessionUser;
    if (userId === recipient) {
        return { error: `You cannot send a message to yourself ${userId} and ${recipient}` }
    }

    const newMessage = new Message({
        sender: userId,
        recipient,
        property: formData.get('property'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('body')
    });
    await newMessage.save();

    return { submitted: true };
}

export default addMessage;