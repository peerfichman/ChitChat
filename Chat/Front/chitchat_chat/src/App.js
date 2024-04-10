import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    const [user] = useAuthState(auth);
    return (
        <BrowserRouter>
        <Routes>
            <Route exact path="/login" element={<Welcome/>} />
            <Route exact path="/chat" element={<ChatBox user={user}/>} />
        </Routes>
        </BrowserRouter>
    );
}
export default App;