import { useState, useEffect } from 'react';
import type { InstituteData, RawInstituteData } from '../types';
import { cleanAndTransformData } from '../utils';

export const useData = () => {
    const [data, setData] = useState<InstituteData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then((jsonData: RawInstituteData[]) => {
                const cleaned = cleanAndTransformData(jsonData);
                setData(cleaned);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading data:', err);
                setError('Failed to load data');
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
};
