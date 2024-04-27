import React from 'react';

const SelectBlock = ({ title, options, selected, setSelected, agentField }) => {
    return (
        <div>
            <label className="block text-lg font-medium ml-1">{title}</label>
            <select
                defaultValue={selected}
                className="border py-2 px-2 pe-9 block w-full  rounded-lg text-sm "
                onChange={(e) => setSelected(e.target.value, agentField)}>
                {Object.entries(options).map(([key, value]) => (
                    <option key={key}>{value}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectBlock;
