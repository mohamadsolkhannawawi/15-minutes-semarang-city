import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

const SearchBar = ({ onSearch, onClear }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleClear = () => {
        setQuery('');
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
                    <button type="button" onClick={handleClear} className="p-1.5 text-gray-500 hover:text-brand-dark-blue">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                )}
                <button type="submit" className="p-1.5 text-gray-500 hover:text-brand-dark-blue">
                    <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;