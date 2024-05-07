import SearchBlock from './SearchBlock';
const AllItemsBlock = ({
    children,
    handleSearch,
    sortComponent,
    filterComponent = null,
}) => {
    console.log('filterComponent', handleSearch);
    return (
        <div className="">
            <SearchBlock
                handleSearch={handleSearch}
                sortComponent={sortComponent}
                filterComponent={filterComponent}
            />
            <div className="grid grid-cols-3 gap-2">{children}</div>
        </div>
    );
};

export default AllItemsBlock;
