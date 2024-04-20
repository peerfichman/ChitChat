import React from 'react';
import OverlayDropDown from '../OverlayDropDown';
import { GrFilter } from 'react-icons/gr';
import { statusOptions } from '../../constant';

const FilterComponent = ({ handleFilter }) => {
    return (
        <OverlayDropDown Icon={GrFilter}>
            <div className="flex px-2 py-1 text-md w-full font-bold">
                By Status:
            </div>
            <div
                className="flex hover:bg-slate-200 pr-2 py-1 text-sm w-full pl-6"
                onClick={() => handleFilter(statusOptions.NOT_STARTED)}>
                Not Started
            </div>
            <div
                className="flex hover:bg-slate-200 pr-2 py-1 text-sm w-full pl-6"
                onClick={() => handleFilter(statusOptions.RUNNING)}>
                Running
            </div>
            <div
                className="flex hover:bg-slate-200 pr-2 py-1 text-sm w-full pl-6"
                onClick={() => handleFilter(statusOptions.COMPLETED)}>
                Completed
            </div>
            <div
                className="flex hover:bg-slate-200 pr-2 py-1 text-sm w-full pl-6"
                onClick={() => handleFilter()}>
                All
            </div>
        </OverlayDropDown>
    );
};

export default FilterComponent;
