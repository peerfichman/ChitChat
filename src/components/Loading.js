import React from 'react';

const Loading = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center bg-slate-100">
            <div className="flex flex-col p-4 mt-20 min-w-[600px] gap-4 items-center h-screen justify-center">
                <div className="text-5xl">Loading...</div>
            </div>
        </div>
    );
};

export default Loading;
