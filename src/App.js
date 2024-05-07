import './App.css';
import ExperimentsPage from './components/Experiment/ExperimentsPage';
import Experiment from './components/Experiment/Experiment';
import ExperimentMetric from './components/metric/ExperimentMetric';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateExperiment from './components/Experiment/CreateExperiment';
import SideBar from './components/sideBar/SideBar';
import CreateStudy from './components/study/CreateStudy';
import Studies from './components/study/Studies';
import Study from './components/study/Study';

function App() {
    return (
        <BrowserRouter>
            <div className="flex min-h-screen w-full flex-row gap-3 bg-slate-100">
                <SideBar />
                <Routes>
                    <Route exact path="/study" element={<CreateStudy />} />
                    <Route exact path="/study/:id" element={<Study />} />

                    <Route exact path="/studies" element={<Studies />} />
                    <Route
                        exact
                        path="/experiment/:study_id"
                        element={<CreateExperiment />}
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
