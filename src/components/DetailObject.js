import React from 'react';

const DetailObject = ({
    title,
    value,
    children,
    isEditable = false,
    onClickEdit = () => {},
    text = 'text-lg',
}) => {
    const className = `mb-1 ${text} font-bold text-slate-500`;
    return isEditable ? (
        <div className="max-w-96 p-2">
            <div className="flex gap-3">
                <p className={className}>{title}</p>
                <div
                    onClick={onClickEdit}
                    className="cursor-pointer hover:opacity-70">
                    🖊
                </div>
            </div>
            <p>{value}</p>
        </div>
    ) : (
        <div className="max-w-96 p-2">
            <div className="flex items-center gap-1">
                <p className={className}>{title}</p>
                {children}
            </div>
            {value === '' ? <br></br> : <p>{value}</p>}
        </div>
    );
};

export default DetailObject;
