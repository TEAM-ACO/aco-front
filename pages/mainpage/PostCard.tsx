import React from 'react'
import { useSelector } from 'react-redux';

function PostCard() {
    return (
        <>
            <form action="" className="px-6">
                <div className="rounded overflow-hidden shadow-lg">
                    {/* <Image className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" width={600} height={400} /> */}
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                        <p className="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                    <div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default PostCard;