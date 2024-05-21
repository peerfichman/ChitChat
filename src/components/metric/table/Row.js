import RowCell from './RowCell';

const Row = ({ row }) => {
    return (
        <div className="grid grid-cols-9">
            {row.map((cell, index) => (
                <RowCell key={index} value={cell} />
            ))}
        </div>
    );
};

export default Row;
