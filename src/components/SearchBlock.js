import SortComponent from './SortComponent';
import FilterComponent from './FilterComponent';

const SearchBlock = ({
    handleSearch,
    sortComponent,
    filterComponent = null,
}) => {
    return (
        <div className="mb-3 flex min-w-[516px] items-center gap-2 lg:min-w-[624px] xl:min-w-[948px]">
            <div className="flex gap-2">
                {filterComponent && (
                    <FilterComponent handleFilter={filterComponent?.onclick} />
                )}
                <SortComponent
                    handleSort={sortComponent?.onclick}
                    attributes={sortComponent?.attributes}
                />
            </div>
            <input
                type="text"
                placeholder="Search"
                className="h-10 w-1/3 cursor-text rounded border border-gray-300 px-3"
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchBlock;
