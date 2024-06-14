import React, { useState } from 'react';

const EditPageTitle = ({
    value,
    onClickCancel = () => {},
    onClickSave = () => {},
}) => {
    const [val, setVal] = useState(value);
    return (
        <div className="flex w-full items-center justify-between gap-2">
            <input
                type="text"
                className="w-full cursor-text rounded-lg border border-gray-400 p-1 text-5xl"
                required={true}
                defaultValue={val}
                onChange={(e) => setVal(e.target.value)}
            />
            <div className="flex  gap-2">
                <div
                    onClick={onClickCancel}
                    className="cursor-pointer hover:opacity-70">
                    ✖
                </div>
                <div
                    onClick={() => onClickSave(val)}
                    className="cursor-pointer hover:opacity-70">
                    ✔
                </div>
            </div>
        </div>
    );
};

export default EditPageTitle;
