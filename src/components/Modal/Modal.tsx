'use client'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Modal {
    onClick: () => void,
    open: boolean,
    setOpen: () => void,
    modalHead: string,
    className: string
}

export const Modal = ({ children, onClick, open, setOpen, modalHead, className }: any) => {

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 flex items-center justify-center w-full overflow-auto">
                <div className=" flex items-center justify-center w-full p-4 text-center sm:p-0 ">
                    <DialogPanel
                        transition
                        className={className ? className :
                            "w-[100%] max-w-[450px] md:ml-[38%] lg:mt-20  lg:ml-[40%] xl:ml-[40%] mx-auto transform overflow-auto  rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8"
                        }
                    >
                        <div className="pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 sm:mx-0 sm:h-10 sm:w-10 overflow-auto ml-5">
                                    <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-blue-500" />
                                </div>  */}
                                <div className="mx-auto">
                                    <DialogTitle as="h3" className="text-xl font-medium  text-center whitespace-nowrap">
                                        <h3 className="text-xl font-bold text-center text-gray-900 uppercase py-3 whitespace-nowrap">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mx-auto">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                            </svg> 
                                            {modalHead}
                                        </h3>
                                    </DialogTitle>

                                    {children}

                                </div>
                            </div>
                        </div>
                        <div className="bg-white flex justify-end">
                            {/* <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        >
                            Deactivate
                        </button> */}
                            <button
                                type="button"
                                data-autofocus
                                onClick={onClick}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-500 p-2 hover:bg-gray-800 text-white
 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto"
                            >
                                <XMarkIcon className=" h-6 w-6" />  Close
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>


    )
}


