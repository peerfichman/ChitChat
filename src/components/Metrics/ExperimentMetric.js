import React from 'react';
import {useParams} from "react-router-dom";

const ExperimentMetric = () => {
    let { id } = useParams();
    return (
        <div>{id}</div>
    );
};

export default ExperimentMetric;
