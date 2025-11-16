'use client';

import React from 'react';
import { X } from 'lucide-react';

interface TagFilterProps {
    allTags: string[];
    selectedTags: string[];
    onTagToggle: (tag: string) => void;
    onClearAll: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ 
    allTags, 
    selectedTags, 
    onTagToggle, 
    onClearAll 
}) => {
    if (allTags.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[#a6a7ab]">Filter by tags</h3>
                {selectedTags.length > 0 && (
                    <button
                        onClick={onClearAll}
                        className="text-xs text-[#98c379] hover:text-[#b5e890] transition-colors"
                    >
                        Clear all
                    </button>
                )}
            </div>
            
            <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                        <button
                            key={tag}
                            onClick={() => onTagToggle(tag)}
                            className={`
                                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                                transition-all duration-200
                                ${isSelected
                                    ? 'bg-[#98c379] text-[#1a1b1e] hover:bg-[#b5e890]'
                                    : 'bg-[#25262b] text-[#a6a7ab] hover:bg-[#2c2e33] hover:text-[#e6e6e6] border border-[#2c2e33]'
                                }
                            `}
                        >
                            #{tag}
                            {isSelected && <X className="w-3 h-3" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TagFilter;

