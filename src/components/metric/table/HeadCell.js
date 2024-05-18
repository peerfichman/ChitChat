const HeadCell = ({ title }) => {
    return (
        <th
            scope="col"
            className="w-10 px-6 py-3 text-start text-xs font-medium uppercase text-gray-500">
            {title}
        </th>
    );
};

export default HeadCell;
