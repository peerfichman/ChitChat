import React from 'react';
import { getCSV } from '../../requests/metric';
import Button from '../Button';
const DownloadCSVButton = ({ collectionId, experimentName }) => {
    const handleDownload = () => {
        getCSV(collectionId, experimentName);
    };

    return (
        <button
            className="h-10 w-1/6 rounded-lg bg-blue-500 text-sm font-bold text-white hover:bg-blue-700"
            onClick={handleDownload}>
            Download CSV
        </button>
    );
};

export default DownloadCSVButton;
