import './App.css';
import ExperimentsPage from './components/Experiment/ExperimentsPage';
import Experiment from './components/Experiment/Experiment';
import ExperimentMetric from './components/metric/ExperimentMetric';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateExperiment from './components/Experiment/CreateExperiment';
import SideBar from './components/sideBar/SideBar';
import Research from './components/research/Research';
import CreateResearch from './components/research/CreateResearch';
import Researches from './components/research/Researches';
import Results from './components/results/Results';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute>
                                <div className="flex min-h-screen w-full flex-row gap-3 bg-slate-100">
                                    <SideBar />
                                    <AppRoutes />
                                </div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
const AppRoutes = () => (
    <Routes>
        <Route exact path="/research" element={<CreateResearch />} />
        <Route exact path="/research/:id" element={<Research />} />

        <Route exact path="/researches" element={<Researches />} />
        <Route
            exact
            path="/research/:research_id/experiment"
            element={<CreateExperiment />}
        />
        <Route exact path="/experiments" element={<ExperimentsPage />} />
        <Route exact path="/results" element={<Results />} />
        <Route exact path="/experiments/:id" element={<Experiment />} />
        <Route
            exact
            path="/experiment/metric/:id"
            element={<ExperimentMetric />}
        />
    </Routes>
);

export default App;
