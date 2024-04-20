import React from 'react';
import { getCSV } from '../../requests/metric';

const DownloadCSVButton = ({ collectionId, experimentName }) => {
    const handleDownload = async () => {
        await getCSV(collectionId, experimentName);
    };

    return (
        <button className="btn btn-info" onClick={handleDownload}>
            Download CSV
        </button>
    );
};

export default DownloadCSVButton;
