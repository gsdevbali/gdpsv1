import React from 'react';
import Divider from './Divider';
import ThemeToggle from './ThemeToggle';
import PrintButton from './PrintButton';
import HomeButton from './HomeButton';

interface PageLayoutProps {
    header: React.ReactNode;
    children: React.ReactNode;
    footer: React.ReactNode;
}

const handlePrint = () => {
    console.log("Printing...");
}

const PageLayout: React.FC<PageLayoutProps> = ({ header, children, footer }) => {
    return (
        <div className="w-full p-4">
            <header className="page-header flex justify-between items-center">{header} 
                <div className="flex items-center gap-2">
                    <HomeButton />
                    <PrintButton />
                    <ThemeToggle />
                </div>
            </header>
            <Divider />
            <main className="page-body">{children}</main>
            <Divider />
            <footer className="page-footer">{footer}</footer>
        </div>
    );
};

export default PageLayout;