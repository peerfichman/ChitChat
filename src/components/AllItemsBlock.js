import SearchBlock from './SearchBlock';
const AllItemsBlock = ({
    children,
    totalItems,
    handleSearch,
    sortComponent,
    filterComponent = null,
}) => {
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
            <div className="flex w-full items-center justify-center">
                <div className="grid w-fit grid-cols-1 items-center gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AllItemsBlock;
