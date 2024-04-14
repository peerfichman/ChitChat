import './App.css';
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';
import ExperimentCreatePage from './components/Experiment/ExperimentCreatePage';
import ExperimentsPage from './components/Experiment/ExperimentsPage';
import Experiment from './components/Experiment/Experiment';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import SetExperiment from './components/Experiment/SetExperiment';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const experiments = [
    {
        id: 0,
        name: 'Experiment 1',
        subject: 'Physics',
        status: 'In Progress',
    },
    {
        id: 1,
        name: 'Experiment 2',
        subject: 'Chemistry',
        status: 'Completed',
    },
    {
        id: 2,
        name: 'Experiment 3',
        subject: 'Biology',
        status: 'Not Started',
    },
    {
        id: 3,
        name: 'Experiment 4',
        subject: 'Physics',
        status: 'In Progress',
    },
];

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Welcome />} />
                <Route exact path="/chat" element={<ChatBox />} />
                <Route
                    exact
                    path="/experiment/create"
                    element={<ExperimentCreatePage />}
                />
                <Route exact path="/new" element={<SetExperiment />} />
                <Route
                    exact
                    path="/experiment"
                    element={<ExperimentsPage experiments={experiments} />}
                />
                <Route
                    exact
                    path="/experiment/:id"
                    // remove this when we get the experiment from api call
                    element={<Experiment experiments={experiments} />}
                />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
