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
                <div className="w-64">
                    <OffCanvas />
                </div>
                {children}
                <div className="w-80">
                    <Channel />
                </div>
            </div>
            <SpeedDial />
        </div>
    )
}

export default mainLayout;