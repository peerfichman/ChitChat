import React from 'react';
import SideBarItem from './SideBarItem';
import { AiOutlineExperiment } from 'react-icons/ai';

const sideBarItems = [
    {
        title: 'Experiments',
        path: '/experiments',
        Icon: AiOutlineExperiment,
    },
    {
        title: 'Studies',
        Icon: AiOutlineExperiment,
        submenu: [
            {
                title: 'All Studies',
                path: '/studies',
            },
            {
                title: 'New Study',
                path: '/study',
            },
        ],
    },
];

const SideBar = () => {
    return (
        <div className="min-w-[250px] border-e border-gray-400 bg-slate-200 py-4">
            <div className="flex flex-col items-center">
                <p
                    className="flex-none text-xl font-semibold"
                    aria-label="Brand">
                    ChitChat.AI
                </p>
                <div className="mt-4 flex flex-col items-center gap-1">
                    <img
                        className="inline-block size-[62px] rounded-full"
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                        alt="Image Description"
                    />
                    <p className="text-lg">Kobi Braynet</p>
                </div>
            </div>
            <div className="my-4 border-t border-gray-300"></div>
            <nav
                className="hs-accordion-group flex w-full flex-col flex-wrap px-6 py-3"
                data-hs-accordion-always-open>
                <p className="mb-2 text-xl text-gray-500">Menu</p>
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
