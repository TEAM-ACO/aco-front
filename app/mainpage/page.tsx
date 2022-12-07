import React from 'react'
import OffCanvas from './offcanvas'
import SpeedDial from './SpeedDial'
import './styles.css';

function mainpage() {
    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="w-64 offcanvas__sticky">
                    <OffCanvas />
                </div>
                <div className="w-8/12 big">
                    contents
                </div>
                <div className="w-80">
                    Channel
                </div>
            </div>
            <SpeedDial />
        </div>
    )
}

export default mainpage