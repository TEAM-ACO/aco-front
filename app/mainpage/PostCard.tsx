import Image from 'next/image';
import React from 'react'

function PostCard() {
    const dummyComments = [{
        User: {
            nickname: 'B-HS',
        },
        content: '헬스하는 남자 변현석',
    }, {
        User: {
            nickname: 'B-HS2',
        },
        content: '스키장 현석',
    }];

    const imgLink = "/img/card-top.jpg"
    return (
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
            </div>
        </form>
    )
}

export default PostCard;