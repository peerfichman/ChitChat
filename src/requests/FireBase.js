import { db } from '../firebase';
import { addDoc, collection, serverTimestamp, query, getDocs, orderBy } from 'firebase/firestore';
import {
    chitChatUserPhotoURL,
    chitChatUserID,
    chitChatUserName,
} from '../constants/generalConstants';

const sendProvokingPrompt = async (id, value) => {
    if (value.trim() === '') {
        return;
    }
    await addDoc(collection(db, id), {
        text: value,
        name: chitChatUserName,
        avatar: chitChatUserPhotoURL,
        createdAt: serverTimestamp(),
        uid: chitChatUserID,
    });
};

const getMessagesByCollectionId = async ( id ) => {
    const messages = collection(db, id);
    let messagesData = []; // Initialize an empty array to store message data
    try {
        const messagesQuery = query(messages, orderBy('createdAt'));
        const messagesList = await getDocs(messagesQuery);
        messagesList.forEach(doc => {
            const temp = doc.data();
            if(temp.sentimentScore || temp.sentimentScore === 0) {
                messagesData.push(doc.data()); // Push each document's data to  the array
            }

        });
        return messagesData; // Return the array containing all messages
    } catch (error) {
        console.error("Error fetching messages:", error);
        return []; // Return an empty array in case of an error
    }
}

export { sendProvokingPrompt, getMessagesByCollectionId };
