'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    value, 
    onChange, 
    placeholder = "Search posts..." 
}) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#a6a7ab]" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3 bg-[#25262b] border border-[#2c2e33] rounded-lg text-[#e6e6e6] placeholder-[#a6a7ab] focus:outline-none focus:border-[#98c379] focus:ring-1 focus:ring-[#98c379] transition-all"
            />
        </div>
    );
};

export default SearchBar;

