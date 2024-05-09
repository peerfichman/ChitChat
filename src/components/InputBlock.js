import React from 'react';

const InputBlock = ({
    title,
    placeHolder,
    setValue,
    attribute,
    maxLength = 200,
    defaultValue = '',
    isRequired = false,
}) => {
    return (
        <>
            <label className="ml-1 block text-lg font-medium dark:text-white">
                {title}
                {isRequired && <span className="pl-1 text-red-500">*</span>}
            </label>
            <input
                type="text"
                className="block w-full cursor-text rounded-lg border border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                placeholder={placeHolder}
                onChange={(e) => setValue(attribute, e.target.value)}
                required={isRequired}
                defaultValue={defaultValue}
                maxLength={maxLength}
            />
        </>
    );
};

export default InputBlock;
