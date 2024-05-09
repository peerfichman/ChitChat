import React from 'react';

const TextareaBlock = ({
    title,
    placeHolder,
    setValue,
    attribute,
    isRequired = false,
    rows = 4,
}) => {
    return (
        <>
            <label className="block text-lg font-medium dark:text-white ml-1">
                {title}
                {isRequired && <span className="text-red-500">*</span>}
            </label>
            <textarea
                className="border resize-none cursor-text border-gray-400 py-3 px-4 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder={placeHolder}
                onChange={(e) => setValue(attribute, e.target.value)}
                required={isRequired}
                rows={rows}
            />
        </>
    );
};

export default TextareaBlock;
