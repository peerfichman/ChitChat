import React from 'react';

const Tooltip = ({ Icon, details, title }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className=" relative flex  justify-center">
            {details && (
                <Icon
                    className="my-1 size-4 rounded-full hover:bg-slate-200"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}></Icon>
            )}
            {isOpen && details && (
                <div className="absolute right-10 top-6 flex w-[130px] flex-col items-start rounded border border-gray-300 bg-white p-1">
                    <p>
                        {'Node '}
                        <b>{title}</b> {details}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
