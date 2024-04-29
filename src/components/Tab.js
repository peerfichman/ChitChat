import React from 'react';
import TabItem from './TabItem';

const Tab = ({ handleTabChange, Tabs, activated }) => {
    return (
        <>
            <div className="">
                <nav className="flex" aria-label="Tabs" role="tablist">
                    {Tabs.map((tab) => (
                        <TabItem
                            key={tab.id}
                            tab={tab}
                            handleTabChange={handleTabChange}
                            activated={activated}
                        />
                    ))}
                    <div className="w-full border-b"></div>
                </nav>
            </div>
        </>
    );
};

export default Tab;
