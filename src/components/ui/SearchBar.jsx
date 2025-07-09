import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const SearchBar = ({ onSearch, onClear }) => {
	const [query, setQuery] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(query);
	};

	const handleClear = () => {
		setQuery("");
		if (onClear) onClear();
	};

	return (
		<form onSubmit={handleSubmit} className="relative">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Simpang Lima, Semarang"
				className="w-full pl-5 pr-16 py-3 text-lg text-brand-dark-blue bg-brand-accent rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-brand-light-blue"
			/>
			<div className="absolute inset-y-0 right-0 flex items-center pr-3">
				{query && (
					<button
						type="button"
						onClick={handleClear}
						className="p-1.5 text-gray-500 hover:text-brand-dark-blue"
					>
						<XMarkIcon className="h-6 w-6" />
					</button>
				)}
				<button
					type="submit"
					className="p-1.5 text-gray-500 hover:text-brand-dark-blue"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
