import React from 'react';

const PageTitle = ({ children, marginY = 'mb-3 mt-5' }) => {
    const className = `text-5xl font-bold text-black ${marginY}`;
    return <h1 className={className}>{children}</h1>;
};

export default PageTitle;
