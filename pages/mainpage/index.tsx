import React from 'react'
import PostCard from './PostCard';
import OffCanvas from './offcanvas'
import SpeedDial from './SpeedDial'

function mainpage() {
    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="w-64 offcanvas__sticky">
                    <OffCanvas />
                </div>
                <div className="w-8/12">
                    <PostCard />
                </div>
                <div className="w-80">
                    <p>
                        Channel
                    </p>
                </div>
            </div>
            <SpeedDial />
        </div>
    )
}

export default mainpage