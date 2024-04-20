import React from 'react';
import OverlayDropDown from '../OverlayDropDown';
import { BiSortAlt2 } from 'react-icons/bi';
import { ExperimentVariables } from '../../constant';

const SortComponent = ({ handleSort }) => {
    return (
        <OverlayDropDown Icon={BiSortAlt2}>
            <div
                className="flex hover:bg-slate-200 px-2 py-1 text-sm w-full"
                onClick={() => handleSort(true, ExperimentVariables.EXP_NAME)}>
                Name Ascending
            </div>
            <div
                className="flex hover:bg-slate-200 px-2 py-1 text-sm w-full"
                onClick={() => handleSort(false, ExperimentVariables.EXP_NAME)}>
                Name Descending
            </div>
            <div
                className="flex hover:bg-slate-200 px-2 py-1 text-sm w-full"
                onClick={() => handleSort(true, ExperimentVariables.EXP_DATE)}>
                Date Ascending
            </div>
            <div
                className="flex hover:bg-slate-200 px-2 py-1 text-sm w-full"
                onClick={() => handleSort(false, ExperimentVariables.EXP_DATE)}>
                Date Descending
            </div>
        </OverlayDropDown>
    );
};

export default SortComponent;
