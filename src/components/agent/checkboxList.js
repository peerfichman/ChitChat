import React from 'react';

import Select from 'react-select';

const CheckboxList = ({
    title,
    options,
    setSelected,
    agentField,
    selected = [],
}) => {
    return (
        <div>
            <label className="block text-lg font-medium ml-1">{title}</label>
            <Select
                defaultValue={selected}
                isMulti
                name={title}
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) =>
                    setSelected(
                        e.map((item) => item.label),
                        agentField,
                    )
                }
            />
        </div>
    );
};

export default CheckboxList;
