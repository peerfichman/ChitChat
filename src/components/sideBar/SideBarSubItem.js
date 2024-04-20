import React from 'react';
import { useNavigate } from 'react-router';
import { RiArrowRightSLine } from 'react-icons/ri';

const SideBarSubItem = ({ item }) => {
    const navigate = useNavigate();

    const boldText = item.path === window.location.pathname ? 'font-bold' : '';
    return (
        <div
            onClick={() => navigate(item.path)}
            className="flex w-full py-1 ml-5 pl-2 cursor-pointer hover:bg-gray-300 rounded-xl">
            <div className="flex gap-2 items-center">
                <RiArrowRightSLine />
                <p className={boldText}>{item.title}</p>
            </div>
        </div>
    );
};

export default SideBarSubItem;
