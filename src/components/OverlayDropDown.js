import React from 'react';

const OverlayDropDown = ({ Icon, children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    console.log('children', children);
    return (
        <button
            className="rounded border p-2 hover:bg-slate-200"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <Icon className="size-6" />
            {isOpen && (
                <div className="absolute flex flex-col items-start rounded border border-gray-300 bg-white">
                    {children}
                </div>
            )}
        </button>
    );
};

export default OverlayDropDown;
