export interface RawInstituteData {
    sr_no: string;
    institute_name: string;
    institute_name_clean: string;
    institute_type: string;
    branch: string;
    quota: string;
    category: string;
    first_marks: string;
    first_rank: string;
    last_marks: string;
    last_rank: string;
    city: string;
}

export interface InstituteData {
    id: number; // processed numeric sr_no
    institute_name: string;
    institute_name_clean: string;
    institute_type: string;
    branch: string;
    quota: string;
    category: string;
    first_marks: number;
    first_rank: number;
    last_marks: number;
    last_rank: number;
    city: string;
}

export type SortField = 'first_marks' | 'first_rank' | 'last_marks' | 'last_rank' | 'institute_name' | 'branch' | 'institute_type' | 'category' | 'quota' | 'city';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
    search: string;
    instituteName: string[];
    branch: string[];
    city: string[];
    instituteType: string[];
    category: string[];
    quota: string[];
}
