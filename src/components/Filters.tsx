import React, { useState } from 'react';
import type { FilterState, InstituteData } from '../types';
import { getUniqueValues } from '../utils';
import { MultiSelect } from './ui/MultiSelect';
import { Search, RotateCcw, Filter } from 'lucide-react';

interface Props {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    allData: InstituteData[];
}

export const Filters: React.FC<Props> = ({ filters, setFilters, allData }) => {
    const [showFilters, setShowFilters] = useState(false);

    // Get unique values for dropdowns
    const instituteNames = getUniqueValues(allData, 'institute_name_clean').map(i => ({ value: String(i), label: String(i) }));
    const branches = getUniqueValues(allData, 'branch').map(b => ({ value: String(b), label: String(b) }));
    const cities = getUniqueValues(allData, 'city').map(c => ({ value: String(c), label: String(c) }));
    const types = getUniqueValues(allData, 'institute_type').map(t => ({ value: String(t), label: String(t) }));
    const categories = getUniqueValues(allData, 'category').map(c => ({ value: String(c), label: String(c) }));
    const quotas = getUniqueValues(allData, 'quota').map(q => ({ value: String(q), label: String(q) }));

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, search: e.target.value }));
    };

    const handleMultiChange = (field: keyof FilterState, values: string[]) => {
        setFilters((prev) => ({ ...prev, [field]: values }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            instituteName: [],
            branch: [],
            city: [],
            instituteType: [],
            category: [],
            quota: []
        });
    };

    const activeFiltersCount =
        filters.instituteName.length +
        filters.branch.length +
        filters.city.length +
        filters.instituteType.length +
        filters.category.length +
        filters.quota.length +
        (filters.search ? 1 : 0);

    return (
        <div className="mb-6 space-y-4">
            {/* Top Bar: Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow hover:shadow-md"
                        placeholder="Search institutes, branches, cities..."
                        value={filters.search}
                        onChange={handleSearchChange}
                        aria-label="Global Search"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center justify-center px-4 py-2 border shadow-sm text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full sm:w-auto xl:hidden ${showFilters || activeFiltersCount > 0 ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        aria-expanded={showFilters}
                        aria-controls="filter-grid"
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className="ml-2 bg-blue-200 text-blue-800 py-0.5 px-2 rounded-full text-xs">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={clearFilters}
                        disabled={activeFiltersCount === 0}
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto whitespace-nowrap"
                        aria-label="Clear all filters"
                    >
                        <RotateCcw className="h-4 w-4 mr-2 sm:mr-0 md:mr-2" />
                        <span className="sm:hidden md:inline">Reset</span>
                    </button>
                </div>
            </div>

            {/* Filters Grid - Hidden on mobile unless toggled, always visible on XL screens if we wanted, but let's make it responsive standard */}
            <div
                id="filter-grid"
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 ease-in-out ${showFilters ? 'block opacity-100' : 'hidden xl:grid opacity-100' // Always show on XL, toggle on smaller
                    }`}
            >
                <MultiSelect
                    label="Institute"
                    options={instituteNames}
                    selected={filters.instituteName}
                    onChange={(vals) => handleMultiChange('instituteName', vals)}
                    placeholder="All Institutes"
                    className="lg:col-span-2"
                />
                <MultiSelect
                    label="City"
                    options={cities}
                    selected={filters.city}
                    onChange={(vals) => handleMultiChange('city', vals)}
                    placeholder="All Cities"
                />
                <MultiSelect
                    label="Branch"
                    options={branches}
                    selected={filters.branch}
                    onChange={(vals) => handleMultiChange('branch', vals)}
                    placeholder="All Branches"
                />
                <MultiSelect
                    label="Type"
                    options={types}
                    selected={filters.instituteType}
                    onChange={(vals) => handleMultiChange('instituteType', vals)}
                    placeholder="All Types"
                />
                <MultiSelect
                    label="Category"
                    options={categories}
                    selected={filters.category}
                    onChange={(vals) => handleMultiChange('category', vals)}
                    placeholder="All Categories"
                />
                <MultiSelect
                    label="Quota"
                    options={quotas}
                    selected={filters.quota}
                    onChange={(vals) => handleMultiChange('quota', vals)}
                    placeholder="All Quotas"
                />
            </div>
        </div>
    );
};
