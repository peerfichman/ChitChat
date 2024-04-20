import React from 'react';
import SideBarItem from './SideBarItem';
import { AiOutlineExperiment } from 'react-icons/ai';

const sideBarItems = [
    {
        title: 'Experiments',
        Icon: AiOutlineExperiment,
        submenu: [
            {
                title: 'All Experiments',
                path: '/experiments',
            },
            {
                title: 'New Experiment',
                path: '/experiment',
            },
        ],
    },
    {
        title: 'Metrics',
        Icon: AiOutlineExperiment,
        path: '/metrics',
    },
];

const SideBar = () => {
    return (
        <div className="bg-slate-200 border-e border-gray-400 min-w-[250px] py-4">
            <div className="flex flex-col items-center">
                <p
                    className="flex-none text-xl font-semibold"
                    aria-label="Brand">
                    ChitChat.AI
                </p>
                <div className="flex flex-col items-center mt-4 gap-1">
                    <img
                        className="inline-block size-[62px] rounded-full"
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                        alt="Image Description"
                    />
                    <p className="text-lg">Kobi Braynet</p>
                </div>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <nav
                className="hs-accordion-group px-6 py-3 w-full flex flex-col flex-wrap"
                data-hs-accordion-always-open>
                <p className="text-gray-500 mb-2 text-xl">Menu</p>
                <ul>
                    {sideBarItems.map((item) => {
                        return (
                            <li key={item.title}>
                                <SideBarItem item={item} />
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default SideBar;
