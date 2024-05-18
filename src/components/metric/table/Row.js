import RowCell from './RowCell';

const Row = ({ row }) => {
    return (
        <tr className="">
            {row.map((cell, index) => (
                <RowCell key={index} value={cell} />
            ))}
        </tr>
    );
};

export default Row;
