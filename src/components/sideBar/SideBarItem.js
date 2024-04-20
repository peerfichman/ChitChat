import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import SideBarSubItem from './SideBarSubItem';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const SideBarItem = ({ item }) => {
    const navigate = useNavigate();
    const [isSubMenuShow, setIsSubMenuShow] = useState(false);
    const handleOnClick = () => {
        if (item.path) {
            navigate(item.path);
            return;
        }

        setIsSubMenuShow(!isSubMenuShow);
    };

    const boldText = item.path === window.location.pathname ? 'font-bold' : '';
    return (
        <div>
            <div
                onClick={() => handleOnClick()}
                className="flex w-full p-2 cursor-pointer hover:bg-gray-300 rounded-xl">
                <div className="flex gap-2 items-center">
                    {item.Icon && <item.Icon />}
                    <p className={boldText}>{item.title}</p>
                </div>
                <div className="flex justify-end w-full items-center">
                    {item.submenu &&
                        (!isSubMenuShow ? (
                            <RiArrowDropDownLine className="" />
                        ) : (
                            <RiArrowDropUpLine className="" />
                        ))}
                </div>
            </div>
            <div className="">
                <ul>
                    {item.submenu &&
                        isSubMenuShow &&
                        item.submenu.map((subItem) => {
                            return (
                                <li key={subItem.title}>
                                    <SideBarSubItem item={subItem} />
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};

export default SideBarItem;
