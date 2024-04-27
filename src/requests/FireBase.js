import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {
    chitChatUserPhotoURL,
    chitChatUserID,
    chitChatUserName,
} from '../constant';

const sendProvokingPrompt = async (id, value) => {
    if (value.trim() === '') {
        alert('Enter valid message');
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

export { sendProvokingPrompt };
