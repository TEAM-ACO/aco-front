import React from 'react'
import Channel from './Channel';
import OffCanvas from './offcanvas';
import SpeedDial from './SpeedDial';

function mainLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="w-64 mr-6 relative">
                    <div className='sticky top-14'>
                        <OffCanvas />
                    </div>
                </div>
                {children}
                <div className="w-80 relative">
                    <div className='sticky top-14'>
                        <Channel />
                    </div>
                </div>
            </div>
            {/* <SpeedDial /> */}
        </div>
    )
}

export default mainLayout;