import React from 'react';

const OverlayDropDown = ({ Icon, children }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <button
            className="border p-2 rounded hover:bg-slate-200"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <Icon className="size-6" />
            {isOpen && (
                <div className="flex flex-col absolute bg-white border border-gray-300 rounded items-start">
                    {children}
                </div>
            )}
        </button>
    );
};

export default OverlayDropDown;