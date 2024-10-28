import React from 'react';
import Divider from './Divider';

interface PageLayoutProps {
    header: React.ReactNode;
    children: React.ReactNode;
    footer: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ header, children, footer }) => {
    return (
        <div className="w-full p-4">
            <header className="page-header">{header}</header>
            <Divider />
            <main className="page-body">{children}</main>
            <Divider />
            <footer className="page-footer">{footer}</footer>
        </div>
    );
};

export default PageLayout;