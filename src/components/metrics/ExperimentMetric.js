import React from 'react';
import GraphComponent from './GraphComponent';
import { useParams } from 'react-router-dom';
import ExperimentStatistics from './ExperimentStatistics';
import DownloadCSVButton from './DownloadCSVButton';
import {getExperimentById} from '../../requests/experiments'
import {ExperimentVariables} from "../../constant";

const ExperimentMetric = () => {
    let { id } = useParams();
    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-slate-100 gap-3">
            <h1 className="mb-3 mt-5 text-4xl font-bold text-black">
                Statistics
            </h1>
            <div className="h-fit">
                <ExperimentStatistics id={id} />
            </div>
            <div className="bg-slate-200 h-96 rounded-2 w-3/4">
                <GraphComponent id={id} />
            </div>
            <DownloadCSVButton collectionId={id} experimentName="messages" />
        </div>
    );
};

export default ExperimentMetric;
