import React from 'react';
import type { InstituteData, SortField, SortOrder } from '../types';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
    data: InstituteData[];
    sortField: SortField;
    sortOrder: SortOrder;
    onSort: (field: SortField) => void;
}

export const DataTable: React.FC<Props> = ({ data, sortField, sortOrder, onSort }) => {
    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return <ArrowUpDown size={14} className="text-gray-400" />;
        return sortOrder === 'asc' ? <ArrowUp size={14} className="text-blue-600" /> : <ArrowDown size={14} className="text-blue-600" />;
    };

    const headers: { label: string; field: SortField; align?: 'left' | 'center' | 'right' }[] = [
        { label: 'Institute Name', field: 'institute_name', align: 'left' },
        { label: 'City', field: 'city', align: 'left' },
        { label: 'Branch', field: 'branch', align: 'left' },
        { label: 'Type', field: 'institute_type', align: 'center' },
        { label: 'Category', field: 'category', align: 'center' },
        { label: 'Quota', field: 'quota', align: 'center' },
        { label: 'First (Marks)', field: 'first_marks', align: 'center' },
        { label: 'First (Rank)', field: 'first_rank', align: 'center' },
        { label: 'Last (Marks)', field: 'last_marks', align: 'center' },
        { label: 'Last (Rank)', field: 'last_rank', align: 'center' },
    ];

    if (data.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-500 text-lg">No institutes found matching your criteria.</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting the filters or search terms.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4" id="data-table-top">
            <div className="overflow-hidden shadow-lg border border-gray-200 sm:rounded-xl bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center text-gray-500" aria-label="Institute Admission Data">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50/80 backdrop-blur-sm sticky top-0 z-1 border-b border-gray-200">
                            <tr>
                                <th scope="col" className="px-3 py-3 sm:px-4 sm:py-4 font-semibold text-gray-900 w-10 sm:w-12">Sr.</th>
                                {headers.map((header) => (
                                    <th
                                        key={header.field}
                                        scope="col"
                                        className={clsx(
                                            "px-4 py-4 cursor-pointer hover:bg-gray-100 transition-colors group select-none whitespace-nowrap",
                                            header.align === 'left' ? "text-left" : "text-center"
                                        )}
                                        onClick={() => onSort(header.field)}
                                        aria-sort={sortField === header.field ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                                    >
                                        <div className={clsx(
                                            "flex items-center gap-1",
                                            header.align === 'center' && "justify-center",
                                            header.align === 'right' && "justify-end"
                                        )}>
                                            {header.label}
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity aria-[sort=ascending]:opacity-100 aria-[sort=descending]:opacity-100">
                                                {getSortIcon(header.field)}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((item) => (
                                <tr key={item.id} className="bg-white hover:bg-blue-50/50 transition-colors">
                                    <td className="px-4 py-4 font-medium text-gray-900">{item.id}</td>
                                    <td className="px-4 py-4 font-medium text-gray-900 text-left min-w-[200px]">
                                        {item.institute_name_clean}
                                    </td>
                                    <td className="px-4 py-4 text-gray-700 text-left">{item.city}</td>
                                    <td className="px-4 py-4 text-gray-700 text-left max-w-[150px] truncate" title={item.branch}>
                                        {item.branch}
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">
                                            {item.institute_type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 whitespace-nowrap">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 whitespace-nowrap">
                                            {item.quota}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-gray-700 font-mono">{item.first_marks || '-'}</td>
                                    <td className="px-4 py-4 text-gray-700 font-mono">{item.first_rank || '-'}</td>
                                    <td className="px-4 py-4 text-gray-700 font-mono">{item.last_marks || '-'}</td>
                                    <td className="px-4 py-4 text-gray-700 font-mono">{item.last_rank || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
