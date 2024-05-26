import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import AppLayout from '../../Layouts/AppLayout';

interface Company {
    id: number;
    name: string;
    email: string;
    logo: string;
    website: string;
}

interface Props {
    companies: {
        data: Company[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
    };
}

const CompaniesList: React.FC<Props> = ({ companies, filters }) => {
    const { data, current_page, last_page } = companies;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = () => {
        Inertia.get('/companies', { search: searchTerm }, { preserveState: true, replace: true });
    };

    return (
        <AppLayout
            title="Companies List"
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Companies List
                </h2>
            )}
        >
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Companies</h1>
                <InertiaLink href="/companies/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add New Company
                </InertiaLink>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search Companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Search
                </button>
            </div>

            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Logo</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Website</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((company) => (
                        <tr key={company.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{company.name}</td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{company.email}</td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {company.logo && (
                                    <img
                                        src={company.logo.startsWith('http') ? company.logo : `/storage/${company.logo}`}
                                        alt={company.name}
                                        className="h-10"
                                    />
                                )}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{company.website}</td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <InertiaLink href={`/companies/${company.id}/edit`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                                    Edit
                                </InertiaLink>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure?')) {
                                            Inertia.delete(`/companies/${company.id}`);
                                        }
                                    }}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => Inertia.get('/companies', { page: current_page - 1, search: searchTerm }, { preserveState: true, replace: true })}
                    disabled={current_page === 1}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-700">
                    Page {current_page} of {last_page}
                </span>
                <button
                    onClick={() => Inertia.get('/companies', { page: current_page + 1, search: searchTerm }, { preserveState: true, replace: true })}
                    disabled={current_page === last_page}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Next
                </button>
            </div>
        </AppLayout>
    );
};

export default CompaniesList;
