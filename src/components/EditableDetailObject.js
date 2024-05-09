import DetailObject from './DetailObject';
import EditDetailObject from './EditDetailObject';
const EditableDetailObject = ({
    title,
    value,
    setValue,
    isEditing,
    setIsEditing,
    text_size = 'text-lg',
}) => {
    const handleSave = (val) => {
        setValue(val);
        setIsEditing(false);
    };
    return isEditing ? (
        <EditDetailObject
            title={title}
            value={value}
            text_size={text_size}
            onClickCancel={() => setIsEditing(false)}
            onClickSave={handleSave}
        />
    ) : (
        <DetailObject
            title={title}
            value={value}
            text={text_size}
            isEditable={true}
            onClickEdit={() => setIsEditing(true)}
        />
    );
};

export default EditableDetailObject;
