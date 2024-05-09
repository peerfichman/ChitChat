import SearchBlock from './SearchBlock';
const AllItemsBlock = ({
    children,
    totalItems,
    handleSearch,
    sortComponent,
    filterComponent = null,
}) => {
    console.log('children: ', children);
    return (
        <div className="">
            <SearchBlock
                handleSearch={handleSearch}
                sortComponent={sortComponent}
                filterComponent={filterComponent}
            />
            <div className="flex w-full items-center justify-center">
                <p className=" mb-2 text-sm text-gray-500">
                    {children.length} of {totalItems} Found
                </p>
            </div>
            <div className="grid grid-cols-3 gap-2">{children}</div>
        </div>
    );
};

export default AllItemsBlock;
