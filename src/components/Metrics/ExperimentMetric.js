import React from 'react';
import GraphComponent from './GraphComponent';
import { useParams } from 'react-router-dom';
import ExperimentStatistics from './ExperimentStatistics';
import DownloadCSVButton from './DownloadCSVButton';

const ExperimentMetric = () => {
    let { id } = useParams();
    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-[#1c2c4c] gap-3">
            <h1 className="mb-3 mt-5 text-4xl font-bold text-white">
                {id} Statistics
            </h1>
            <div className="h-fit">
                <ExperimentStatistics id={id} />
            </div>
            <div className="bg-light h-96">
                <GraphComponent id={id} />
            </div>
            <DownloadCSVButton collectionId={id} experimentName="messages" />
        </div>
    );
};

export default ExperimentMetric;
