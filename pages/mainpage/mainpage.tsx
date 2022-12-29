import React, { useState, useCallback, useEffect } from 'react'
import Channel from './Channel';
import OffCanvas from './offcanvas';

function mainLayout({ children }: {
    children: React.ReactNode
}) {
    const [speedDial, setSpeedDial] = useState<boolean>(true);
    // const [offcanvasToggle, setOffcanvasToggle] = useState<boolean>(true);
    const [channelToggle, setChannelToggle] = useState<boolean>(true);

    const onToggleSpeedDial = useCallback(() => {
        setSpeedDial((prev) => !prev)
    }, [])

    // const onOffcanvasToggle = useCallback(() => {
    //     if (offcanvasToggle == true) {
    //         setChannelToggle(false)
    //         console.log('dd')
    //     }
    //     setOffcanvasToggle((prev) => !prev)
    // }, [])

    const onChannelToggle = useCallback(() => {
        // if (channelToggle == true) {
        //     setOffcanvasToggle(false)
        // }
        setChannelToggle((prev) => !prev)
    }, [])

    // slg넘어가면 true
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize); //clean up
        };
    }, []);

    const handleResize = useCallback(() => {
        if (window.innerWidth > 890) {
            // setOffcanvasToggle(true)
            setChannelToggle(true)
            return
        }
    }, []);

    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="md:w-64 w-0 relative">
                    <div className='relative hidden md:block md:sticky md:top-14 md:z-10'>
                        <OffCanvas />
                    </div>
                </div>
                <div className='w-full order-3 md:order-2'>
                    {children}
                </div>
                <div className="slg:w-80 md:w-72 relative order-2 md:order-3">
                    <div className={channelToggle ? 'sticky top-14 w-64' : 'hidden'}>
                        <Channel />
                    </div>
                </div>
            </div>
            <div className='md:hidden'>
                <div data-dial-init className="fixed right-6 bottom-6 group">
                    <div className={speedDial ? 'hidden' : 'flex'}>
                        <div id="speed-dial-menu-default" className="flex flex-col items-center mb-4 space-y-2">
                            {/* <button
                                onClick={onOffcanvasToggle}
                                type="button"
                                data-tooltip-target="tooltip-share"
                                data-tooltip-placement="left"
                                className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                                <svg
                                    aria-hidden="true"
                                    className="-ml-px w-6 h-6 "
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                                </svg>
                                <span className="sr-only">Share</span>
                            </button>
                            <div
                                id="tooltip-share"
                                role="tooltip"
                                className="inline-block absolute invisible z-10 py-2 px-3 w-auto text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                Share
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div> */}
                            <button
                                onClick={onChannelToggle}
                                type="button"
                                data-tooltip-target="tooltip-chat"
                                data-tooltip-placement="left"
                                className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Chat</span>
                            </button>
                            <div id="tooltip-chat" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 w-auto text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                Chat
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        data-dial-toggle="speed-dial-menu-default"
                        aria-controls="speed-dial-menu-default"
                        aria-expanded="false"
                        onClick={onToggleSpeedDial}
                        className="flex justify-center items-center w-[52px] h-[52px] text-white bg-blue-700 rounded-full hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 transition-transform group-hover:rotate-45"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        <span className="sr-only">Open actions menu</span>
                    </button>
                </div>
                {/* <SpeedDial /> */}
            </div>
        </div>
    )
}

export default mainLayout;