import React, { useState } from 'react';

const EditDetailObject = ({
    title,
    value,
    onClickCancel = () => {},
    onClickSave = () => {},
    text_size = 'text-lg',
}) => {
    const [val, setVal] = useState(value);
    const className = `mb-1 ${text_size} font-bold`;
    return (
        <div className="max-w-96 p-2">
            <div className="flex gap-3">
                <p className={className}>{title}</p>
            </div>
            <div className="flex items-center justify-between gap-2">
                <input
                    type="text"
                    className="w-full cursor-text rounded-lg border border-gray-400 p-1 text-sm"
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
        </div>
    );
};

export default EditDetailObject;
