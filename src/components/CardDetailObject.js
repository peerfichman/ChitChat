const CardDetailObject = ({ title, value }) => {
    return (
        <div className="flex gap-1">
            <p className="font-bold text-gray-500">{title}:</p>
            <p className="text-gray-500">{value}</p>
        </div>
    );
};

export default CardDetailObject;
