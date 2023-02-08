import { randomTip } from '@actions/post';
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/config'
import Link from 'next/link'

function Channel() {
    const dispatch = useAppDispatch();
    const { ranTip } = useAppSelector((state) => state.post)

    useEffect(() => {
        dispatch(randomTip())
    }, [])

    return (
        <div className="z-50 relative">
            <div className='slg:pr-4 bg-white'>
                <aside className="w-64">
                    <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                        <div className="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900" role="alert">
                            <div className="flex items-center mb-3">
                                <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Today's Tip</span>
                            </div>
                            <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
                                {ranTip}
                            </p>
                        </div>
                        {/* 유저 이미지 */}
                        <div className="p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                                <li>
                                    <Link href="/mainpage/dm" className="items-center justify-center p-3 flex
                                    text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                        <div className="text-base flex justify-center items-center">채팅방 입장하기</div>
                                    </Link>
                                </li>
                            </ol>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Channel