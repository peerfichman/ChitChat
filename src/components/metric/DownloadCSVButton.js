import React from 'react';
import { CSVLink } from 'react-csv';

const DownloadCSVButton = ({ data, headers, filename }) => {
    return (
        <CSVLink
            className=" w-[180px] rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            data={data}
            headers={headers}
            filename={filename + '.csv'}>
            Download as CSV
        </CSVLink>
    );
};

export default DownloadCSVButton;
