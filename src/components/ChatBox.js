import React, { useEffect, useRef, useState } from 'react';
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Message';
import SendMessage from './SendMessage';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ChatBox = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const scroll = useRef();
    const navigate = useNavigate();
    const [experimentStatus, setExperimentStatus] = useState(null);

    useEffect(() => {
        const socket = new WebSocket(
            process.env.REACT_APP_EXPERIMENT_SOCKET_URL,
        );
        socket.addEventListener('open', () => {
            console.log('Connected to the WS Server');
        });

        const q = query(
            collection(db, id),
            orderBy('createdAt', 'desc'),
            limit(50),
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.sort(
                (a, b) => a.createdAt - b.createdAt,
            );
            setMessages(sortedMessages);
        });
        return () => unsubscribe;
    }, []);

    return user ? (
        <div className="App">
            <main className="chat-box">
                <div className="messages-wrapper">
                    {messages?.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
                </div>
                {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
                <span ref={scroll}></span>
                <SendMessage scroll={scroll} id={id} />
            </main>
        </div>
    ) : (
        navigate('/login')
    );
};

export default ChatBox;
