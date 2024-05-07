import React from 'react';
import OverlayDropDown from './OverlayDropDown';
import { BiSortAlt2 } from 'react-icons/bi';

const SortComponent = ({ handleSort, attributes }) => {
    return (
        <OverlayDropDown Icon={BiSortAlt2}>
            <div
                className="flex w-full px-2 py-1 text-sm hover:bg-slate-200"
                onClick={() => handleSort(true, attributes.name)}>
                Name Ascending
            </div>
            <div
                className="flex w-full px-2 py-1 text-sm hover:bg-slate-200"
                onClick={() => handleSort(false, attributes.name)}>
                Name Descending
            </div>
            <div
                className="flex w-full px-2 py-1 text-sm hover:bg-slate-200"
                onClick={() => handleSort(true, attributes.date)}>
                Date Ascending
            </div>
            <div
                className="flex w-full px-2 py-1 text-sm hover:bg-slate-200"
                onClick={() => handleSort(false, attributes.date)}>
                Date Descending
            </div>
        </OverlayDropDown>
    );
};

export default SortComponent;
