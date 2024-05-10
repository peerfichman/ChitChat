import React from 'react';
import { twMerge } from 'tailwind-merge';

const TabItem = ({ tab, handleTabChange, activated }) => {
    let className =
        'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium text-center rounded-t-lg text-md';
    if (tab.id === activated) {
        className = twMerge(
            className,
            'bg-white cursor-default text-gray-700 border-x border-t',
        );
        return (
            <button
                type="button"
                className={className}
                id={`card-type-tab-item-${tab.id}`}
                data-hs-tab={`#card-type-tab-${tab.id}`}
                aria-controls={`card-type-tab-${tab.id}`}
                role="tab"
                onClick={() => handleTabChange(tab.id)}
                disabled>
                {tab.name}
            </button>
        );
    }

    className = twMerge(
        className,
        'bg-gray-50 border hover:text-gray-700 text-gray-500',
    );
    return (
        <div className="flex w-fit">
            <button
                type="button"
                className={className}
                id={`card-type-tab-item-${tab.id}`}
                data-hs-tab={`#card-type-tab-${tab.id}`}
                aria-controls={`card-type-tab-${tab.id}`}
                role="tab"
                onClick={() => handleTabChange(tab.id)}>
                {tab.name}
            </button>
            <div className="w-[2px] border-b"></div>
        </div>
    );
};

export default TabItem;
