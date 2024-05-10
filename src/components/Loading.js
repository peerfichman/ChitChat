import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center bg-slate-100">
            <div className="flex flex-col p-4 mt-20 min-w-[600px] gap-4 items-center h-screen justify-center">
                <TailSpin
                    visible={true}
                    height="100"
                    width="100"
                    color="blue"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </div>
    );
};

export default Loading;
