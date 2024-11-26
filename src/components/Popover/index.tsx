import React, { useState } from 'react';

function Popover({ children, title }: any) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <button
                type="button"
                className="text-gray-900 flex"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                Info
            </button>

            {isOpen && (
                <div
                    className="absolute z-10 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm"
                    role="tooltip"
                    id="popover-default"
                >
                    <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
                        <h3 className="font-semibold text-gray-900">
                            {title}
                        </h3>
                    </div>
                    <div className="px-3 py-2">
                        {children}
                    </div>
                    <div data-popper-arrow></div>
                </div>
            )}
        </div>
    );
}

export default Popover;