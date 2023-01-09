import React, { useState, useCallback, useEffect } from 'react'
import Channel from './Channel';
import OffCanvas from './offcanvas';

function mainLayout({ children }: {
    children: React.ReactNode
}) {
    const [channelToggle, setChannelToggle] = useState<boolean>(true);

    const onChannelToggle = useCallback(() => {
        setChannelToggle((prev) => !prev)
    }, [channelToggle])

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [channelToggle]);

    const handleResize = useCallback(() => {
        if (window.innerWidth > 768) {
            setChannelToggle(true)
            return
        }
    }, [channelToggle]);

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
                <div className="slg:w-80 md:w-64 relative order-2 md:order-3">
                    <div className={channelToggle ? 'hidden md:flex sticky top-14 w-52 slg:w-64' : 'sticky md:hidden'}>
                        <Channel />
                    </div>
                </div>
            </div>
            <div className='md:hidden'>
                <div data-dial-init className="fixed right-6 bottom-6 group">
                    <button
                        type="button"
                        data-dial-toggle="speed-dial-menu-default"
                        aria-controls="speed-dial-menu-default"
                        aria-expanded="false"
                        onClick={onChannelToggle}
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
            </div>
        </div>
    )
}

export default mainLayout;