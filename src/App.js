import './App.css';
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';
import ExperimentsPage from './components/Experiment/ExperimentsPage';
import Experiment from './components/Experiment/Experiment';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import SetExperiment from './components/Experiment/SetExperiment';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExperimentCreatePage from './components/Experiment/ExperimentCreatePage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Welcome />} />
                <Route exact path="/chat" element={<ChatBox />} />
                <Route exact path="/experiment" element={<SetExperiment />} />
                <Route
                    exact
                    path="/experiment2"
                    element={<ExperimentCreatePage />}
                />
                <Route
                    exact
                    path="/experiments"
                    element={<ExperimentsPage />}
                />
                <Route exact path="/experiments/:id" element={<Experiment />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
