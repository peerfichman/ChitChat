import React from 'react';
import { getCSV } from '../../requests/metric';
import Button from '../Button';
const DownloadCSVButton = ({ collectionId, experimentName }) => {
    const handleDownload = () => {
        console.log(collectionId);
        console.log(experimentName);

        getCSV(collectionId, experimentName);
    };

    return <Button text={'Download CSV'} onclick={handleDownload} />;
};

export default DownloadCSVButton;
