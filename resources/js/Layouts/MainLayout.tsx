import React, { ReactNode } from 'react';
import { Sidebar, Navbar, Footer } from 'flowbite-react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/">Dashboard</Sidebar.Item>
            <Sidebar.Item href="/companies">Companies</Sidebar.Item>
            <Sidebar.Item href="/users">Users</Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <div className="flex flex-col flex-1">
        <Navbar>
          <Navbar.Brand href="/">
            <img
              src="/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Company Manager
            </span>
          </Navbar.Brand>
        </Navbar>

        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>

        <Footer>
          <Footer.Copyright
            href="#"
            by="Company Manager™"
            year={new Date().getFullYear()}
          />
        </Footer>
      </div>
    </div>
  );
};

export default MainLayout;
