import './App.css';
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';
import ExperimentsPage from './components/Experiment/ExperimentsPage';
import Experiment from './components/Experiment/Experiment';
import ExperimentMetric from './components/Metrics/ExperimentMetric';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExperimentCreatePage from './components/Experiment/ExperimentCreatePage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
                <Route exact path="/login/:id" element={<Welcome />} />
                <Route exact path="/chat/:id" element={<ChatBox />} />
                <Route
                    exact
                    path="/experiment"
                    element={<ExperimentCreatePage />}
                />
=======
                <Route exact path="/login" element={<Welcome />} />
                <Route exact path="/chat" element={<ChatBox />} />
>>>>>>> ba0e3d6 (Refactor constant.js, ChatBox.js, ExperimentDetails.js, SetExperiment.js, ExperimentCard.js, AgentDetails.js, AgentsBlock.js, InputBlock.js, and agents.js)
                <Route
                    exact
                    path="/experiment"
                    element={<ExperimentCreatePage />}
                />
                <Route
                    exact
                    path="/experiments"
                    element={<ExperimentsPage />}
                />
                <Route exact path="/experiments/:id" element={<Experiment />} />
                <Route
                    exact
                    path="/experiment/metric/:id"
                    element={<ExperimentMetric />}
                />
                <Route exact path="/experiments/:id" element={<Experiment />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
