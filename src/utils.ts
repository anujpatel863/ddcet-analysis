import type { InstituteData, RawInstituteData, FilterState, SortField, SortOrder } from './types';

export const cleanAndTransformData = (rawData: RawInstituteData[]): InstituteData[] => {
    return rawData
        .filter(item => {
            // Rule 1: Remove if institute_name is empty
            if (!item.institute_name || item.institute_name.trim() === '') return false;

            // Rule 2: Remove if sr_no is not a valid number (removes headers/footers)
            const srNo = parseInt(item.sr_no);
            if (isNaN(srNo)) return false;

            return true;
        })
        .map(item => ({
            ...item,
            id: parseInt(item.sr_no),
            // Convert numerical strings to actual numbers, handle 'First Admitted' etc by treating as 0 or null if needed, 
            // but dataset mainly has numbers or valid strings for those. 
            // Based on json inspection, some rows had text. The filter above should catch most headers.
            // verifying strictly:
            first_marks: parseFloat(item.first_marks) || 0,
            first_rank: parseFloat(item.first_rank) || 0,
            last_marks: parseFloat(item.last_marks) || 0,
            last_rank: parseFloat(item.last_rank) || 0,
        }));
};

export const getUniqueValues = (data: InstituteData[], field: keyof InstituteData) => {
    return Array.from(new Set(data.map(item => item[field]).filter(Boolean))).sort();
};

export const filterData = (data: InstituteData[], filters: FilterState) => {
    return data.filter(item => {
        // Search (Institute Name or Branch)
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchName = item.institute_name_clean.toLowerCase().includes(searchLower);
            const matchBranch = item.branch.toLowerCase().includes(searchLower);
            const matchCity = item.city.toLowerCase().includes(searchLower);
            if (!matchName && !matchBranch && !matchCity) return false;
        }

        // Multi-select filters
        if (filters.instituteName.length > 0 && !filters.instituteName.includes(item.institute_name_clean)) return false;
        if (filters.branch.length > 0 && !filters.branch.includes(item.branch)) return false;
        if (filters.city.length > 0 && !filters.city.includes(item.city)) return false;
        if (filters.instituteType.length > 0 && !filters.instituteType.includes(item.institute_type)) return false;
        if (filters.category.length > 0 && !filters.category.includes(item.category)) return false;
        if (filters.quota.length > 0 && !filters.quota.includes(item.quota)) return false;

        return true;
    });
};

export const sortData = (data: InstituteData[], field: SortField, order: SortOrder) => {
    return [...data].sort((a, b) => {
        let valA: any = a[field];
        let valB: any = b[field];

        if (typeof valA === 'string') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }

        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });
};
