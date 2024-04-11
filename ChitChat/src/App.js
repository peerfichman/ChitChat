import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import SetExperiment from "./components/Experiment/SetExperiment";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    const [user] = useAuthState(auth);
    return (
        <BrowserRouter>
        <Routes>
            <Route exact path="/login" element={<Welcome/>} />
            <Route exact path="/chat" element={<ChatBox user={user}/>} />
            <Route exact path="/new" element={<SetExperiment/>} />
        </Routes>
        </BrowserRouter>
    );
}
export default App;