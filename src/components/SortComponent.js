import React from 'react';
import OverlayDropDown from './OverlayDropDown';
import { BiSortAlt2 } from 'react-icons/bi';

const SortComponent = ({ handleSort, attributes }) => {
    return (
        <OverlayDropDown Icon={BiSortAlt2}>
            {Object.keys(attributes).map((key) => (
                <>
                    <div
                        key={key + 1}
                        className="flex w-full px-2 py-1 text-sm hover:bg-slate-200"
                        onClick={() => handleSort(true, attributes[key])}>
                        {String(key.charAt(0).toUpperCase()) + key.slice(1)}{' '}
                        Ascending
                    </div>
                    <div
                        key={key + 2}
                        className="flex w-full px-2 py-1 text-sm hover:bg-slate-200"
                        onClick={() => handleSort(false, attributes[key])}>
                        {String(key.charAt(0).toUpperCase()) + key.slice(1)}{' '}
                        Descending
                    </div>
                </>
            ))}
        </OverlayDropDown>
    );
};

export default SortComponent;
