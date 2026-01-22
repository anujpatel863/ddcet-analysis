import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Option {
    value: string;
    label: string;
}

interface MultiSelectProps {
    options: Option[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    label: string;
    className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    selected,
    onChange,
    placeholder = 'Select...',
    label,
    className
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const toggleOption = (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter(v => v !== value)
            : [...selected, value];
        onChange(newSelected);
    };

    const removeOption = (value: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(selected.filter(v => v !== value));
    };

    return (
        <div className={twMerge("relative", className)} ref={containerRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>

            <div
                className="min-h-[42px] px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 flex flex-wrap gap-2 items-center"
                onClick={() => setIsOpen(!isOpen)}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        setIsOpen(!isOpen);
                        e.preventDefault();
                    }
                }}
            >
                {selected.length === 0 && (
                    <span className="text-gray-500 text-sm">{placeholder}</span>
                )}

                {selected.map(value => (
                    <span
                        key={value}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                        {value}
                        <button
                            type="button"
                            onClick={(e) => removeOption(value, e)}
                            className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                            aria-label={`Remove ${value}`}
                        >
                            <X size={12} />
                        </button>
                    </span>
                ))}

                <div className="ml-auto">
                    <ChevronDown size={16} className="text-gray-400" />
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    <div className="px-3 py-2 sticky top-0 bg-white border-b">
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                    </div>
                    <ul role="listbox" className="py-1">
                        {filteredOptions.length === 0 ? (
                            <li className="px-3 py-2 text-gray-500 text-sm">No options found</li>
                        ) : (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    className={clsx(
                                        "cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50",
                                        selected.includes(option.value) ? "text-blue-900 bg-blue-50" : "text-gray-900"
                                    )}
                                    role="option"
                                    aria-selected={selected.includes(option.value)}
                                    onClick={() => toggleOption(option.value)}
                                >
                                    <span className={clsx("block truncate", selected.includes(option.value) && "font-semibold")}>
                                        {option.label}
                                    </span>
                                    {selected.includes(option.value) && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                            <Check size={16} />
                                        </span>
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};
