import React from 'react';
import OverlayDropDown from './OverlayDropDown';
import { GrFilter } from 'react-icons/gr';
import { statusOptions } from '../constants/experimentsConstants';

const FilterComponent = ({ handleFilter }) => {
    return (
        <OverlayDropDown Icon={GrFilter} className="">
            <div className="text-md flex w-full cursor-default px-2 py-1 font-bold">
                By Status:
            </div>
            <div
                className="flex w-full py-1 pl-6 pr-2 text-sm hover:bg-slate-200"
                onClick={() => handleFilter(statusOptions.NOT_STARTED)}>
                Not Started
            </div>
            <div
                className="flex w-full py-1 pl-6 pr-2 text-sm hover:bg-slate-200"
                onClick={() => handleFilter(statusOptions.RUNNING)}>
                Running
            </div>
            <div
                className="flex w-full py-1 pl-6 pr-2 text-sm hover:bg-slate-200"
                onClick={() => handleFilter(statusOptions.COMPLETED)}>
                Completed
            </div>
            <div
                className="flex w-full py-1 pl-6 pr-2 text-sm hover:bg-slate-200"
                onClick={() => handleFilter()}>
                All
            </div>
        </OverlayDropDown>
    );
};

export default FilterComponent;
