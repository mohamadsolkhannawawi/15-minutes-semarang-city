import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		if (onSearch) {
			onSearch(searchQuery);
		}
	};

	return (
		<form onSubmit={handleSearch} className="relative flex items-center">
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Cari lokasi atau fasilitas..."
				className="w-full px-4 py-2 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light-blue focus:border-transparent"
			/>
			<button
				type="submit"
				className="absolute right-2 p-2 text-gray-500 hover:text-brand-dark-blue focus:outline-none"
			>
				<MagnifyingGlassIcon className="h-5 w-5" />
			</button>
		</form>
	);
};

export default SearchBar;
