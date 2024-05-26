import React, { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import axios from 'axios';

export default function Welcome() {
  const [companyCount, setCompanyCount] = useState(0);

  useEffect(() => {
    axios.get('/api/companies/count')
      .then(response => {
        setCompanyCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching company count:', error);
      });
  }, []);

  return (
    <div>
      <div className="p-6 lg:p-8 bg-white dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent border-b border-gray-200 dark:border-gray-700">
        <ApplicationLogo className="block h-12 w-auto" />
        <h1 className="mt-8 text-2xl font-medium text-gray-900 dark:text-white">
          Welcome to your  application!
        </h1>
        <p className="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed">
          Company management system
        </p>
        <p className="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed">
          Number of companies: {companyCount}
        </p>
      </div>
    </div>
  );
}
