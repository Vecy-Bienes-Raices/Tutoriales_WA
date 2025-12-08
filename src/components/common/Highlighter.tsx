import React from 'react';

interface HighlighterProps {
    children: React.ReactNode;
    active?: boolean;
    showHighlight?: boolean;
    onClick?: () => void;
    className?: string;
}

const Highlighter: React.FC<HighlighterProps> = ({ children, active, showHighlight = true, onClick, className = "" }) => {
    // Accessibility: Use button for interactive elements, div for passive
    const Component = active ? 'button' : 'div';

    return (
        <Component
            onClick={active ? onClick : undefined}
            // Accessibility: Add key handler if needed, though button handles Enter/Space natively
            className={`relative transition-all duration-300 text-left w-full ${className} ${active ? 'cursor-pointer z-20 shadow-lg ring-2 ring-green-500 ring-offset-2 rounded-md focus:outline-none focus:ring-green-600' : ''}`}
            type={active ? "button" : undefined}
        >
            {children}
            {active && showHighlight && (
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-3 z-50 flex h-10 w-10 pointer-events-none">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-10 w-10 bg-green-600 justify-center items-center text-white shadow-xl ring-2 ring-white">
                        <span className="text-xl filter drop-shadow-md">👆</span>
                    </span>
                </span>
            )}
            {active && showHighlight && (
                <div className="absolute inset-0 bg-green-500/10 pointer-events-none rounded-md animate-pulse"></div>
            )}
        </Component>
    );
};

export default Highlighter;
