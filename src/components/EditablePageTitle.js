import { useState } from 'react';

import PageTitle from './PageTitle';
import EditPageTitle from './EditPageTitle';

const EditablePageTitle = ({ title, setTitle }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (val) => {
        setTitle(val);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center">
            {isEditing ? (
                <EditPageTitle
                    value={title}
                    onClickSave={handleSave}
                    onClickCancel={() => setIsEditing(false)}
                />
            ) : (
                <div className="flex flex-row items-end gap-2">
                    <PageTitle marginY="">{title}</PageTitle>
                    <div
                        onClick={() => setIsEditing(true)}
                        className="cursor-pointer content-end hover:opacity-70">
                        🖊
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditablePageTitle;
