import React from 'react';
import { Link } from '@inertiajs/react';
import { HiSun, HiMoon } from 'react-icons/hi';

const HeaderUnauthenticated = () => {
    const toggleTheme = () => {
        // Add theme toggle logic here
    };

    return (
        <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        {/* Replace x-header-link with a suitable component or link */}
                        <Link href="/" className="text-lg font-bold">Company Logo</Link>
                    </div>
                    <div className="flex items-center">
                        <button
                            id="theme-toggle"
                            data-tooltip-target="tooltip-toggle"
                            type="button"
                            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                            onClick={toggleTheme}
                        >
                            <HiSun className="hidden w-5 h-5" id="theme-toggle-light-icon" />
                            <HiMoon className="hidden w-5 h-5" id="theme-toggle-dark-icon" />
                        </button>
                        <div
                            id="tooltip-toggle"
                            role="tooltip"
                            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
                        >
                            Toggle dark mode
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">

                            <li>
                                <Link
                                    href="/dashboard"
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                   Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`mailto:nuzulfikrie@fikriesalam.dev`}
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Contact Developer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HeaderUnauthenticated;
