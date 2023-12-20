import { MagnifyingGlass } from "@phosphor-icons/react";

const SearchBox = ({ onchange }) => {
    return (
        <div className="w-[300px] rounded-full border border-gray-300 aria-selected::border-red-500 shadow-sm flex relative items-center h-[50px]">
            <input
                onChange={onchange}
                placeholder="search"
                className="border-none outline-none flex-1 bg-transparent h-full pl-[60px]"
                type="text" />
            <p className="absolute left-5 text-gray-500">
                <MagnifyingGlass size={25} weight="light" />
            </p>
        </div>
    )
}

export default SearchBox;


