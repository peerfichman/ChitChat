import React from 'react';

const InputBlock = ({ title, placeHolder, setValue, isRequired = false }) => {
    return (
        <>
            <label className="block text-lg font-medium dark:text-white ml-1">
                {title}
            </label>
            <input
                type="text"
                className="border cursor-text border-gray-400 py-3 px-4 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder={placeHolder}
                onChange={(e) => setValue(e.target.value)}
                required={isRequired}
            />
        </>
    );
};

export default InputBlock;
