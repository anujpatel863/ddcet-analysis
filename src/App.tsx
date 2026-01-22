import { useState, useMemo } from 'react';
import './index.css';
import { useData } from './hooks/useData';
import { DataTable } from './components/DataTable';
import { Filters } from './components/Filters';
import type { FilterState, SortField, SortOrder } from './types';
import { filterData, sortData } from './utils';
import { FileText, Github } from 'lucide-react';

import { TableSkeleton } from './components/ui/Skeleton';

// ... (existing imports)

function App() {
  const { data, loading, error } = useData();

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    instituteName: [],
    branch: [],
    city: [],
    instituteType: [],
    category: [],
    quota: []
  });

  const [sortField, setSortField] = useState<SortField>('first_rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredData = useMemo(() => {
    return filterData(data, filters);
  }, [data, filters]);

  const sortedData = useMemo(() => {
    return sortData(filteredData, sortField, sortOrder);
  }, [filteredData, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            {/* Header Skeleton */}
            <div className="flex items-center gap-3 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div>
                <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </header>
          <TableSkeleton />
        </div>
      </div>
    );
  }
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-lg text-white shadow-md">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">DDCET 2024 Analysis</h1>
              <p className="text-sm text-gray-500">Filter and analyze admission data</p>
            </div>
          </div>
          <div className="self-start sm:self-auto bg-white px-4 py-1.5 rounded-full shadow-sm text-sm font-semibold text-gray-700 border border-gray-200">
            {filteredData.length.toLocaleString()} Records
          </div>
        </header>

        <Filters filters={filters} setFilters={setFilters} allData={data} />

        <DataTable
          data={sortedData}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}

export default App;
