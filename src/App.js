import './App.css';
import ExperimentsPage from './components/Experiment/ExperimentsPage';
import Experiment from './components/Experiment/Experiment';
import ExperimentMetric from './components/metric/ExperimentMetric';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExperimentCreatePage from './components/Experiment/ExperimentCreatePage';
import SideBar from './components/sideBar/SideBar';

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-row w-full gap-3 bg-slate-100 min-h-screen">
                <SideBar />
                <Routes>
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
                    <Route
                        exact
                        path="/experiments/:id"
                        element={<Experiment />}
                    />
                    <Route
                        exact
                        path="/experiment/metric/:id"
                        element={<ExperimentMetric />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;
