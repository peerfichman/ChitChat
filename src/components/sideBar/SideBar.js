import React, { useContext } from 'react';
import SideBarItem from './SideBarItem';
import {
    AiOutlineExperiment,
    AiOutlineFileSearch,
    AiOutlineBarChart,
} from 'react-icons/ai';

import { AuthContext } from '../../context/AuthContext';
import Loading from '../Loading';

const sideBarItems = [
    {
        title: 'Researches',
        Icon: AiOutlineFileSearch,
        path: '/researches',
        // submenu: [
        //     {
        //         title: 'All Researches',
        //         path: '/researches',
        //     },
        //     {
        //         title: 'New Research',
        //         path: '/research',
        //     },
        // ],
    },
    {
        title: 'Experiments',
        path: '/experiments',
        Icon: AiOutlineExperiment,
    },
    {
        title: 'Results',
        path: '/results',
        Icon: AiOutlineBarChart,
    },
];

const SideBar = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }
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
                        src={user?.researcher_photo_url}
                        alt="Image Description"
                    />
                    <p className="text-lg">{user?.researcher_name}</p>
                </div>
                <button
                    className="mt-3 rounded-lg border bg-blue-500 px-2 py-1 text-sm text-white"
                    onClick={() => {
                        window.open(
                            `${process.env.REACT_APP_CHICHAT_API_URL}auth/logout`,
                            '_self',
                        );
                    }}>
                    Log Out
                </button>
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
