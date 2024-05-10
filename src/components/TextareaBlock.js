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
            <label className="ml-1 block text-lg  font-medium">
                {title}
                {isRequired && <span className="text-red-500">*</span>}
            </label>
            <textarea
                className="block w-full cursor-text resize-none rounded-lg border border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                placeholder={placeHolder}
                onChange={(e) => setValue(attribute, e.target.value)}
                required={isRequired}
                rows={rows}
            />
        </>
    );
};

export default TextareaBlock;
