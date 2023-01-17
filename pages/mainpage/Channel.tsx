import Link from 'next/link'
import React from 'react'

function Channel() {
    return (
        <div className="z-50 relative">
            <div className='slg:pr-4 bg-white'>
                <aside className="w-64" aria-label="Sidebar">
                    <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                        <div id="dropdown-cta" className="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900" role="alert">
                            <div className="flex items-center mb-3">
                                <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Today's Tip</span>
                                <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-collapse-toggle="dropdown-cta" aria-label="Close">
                                    <span className="sr-only">Close</span>
                                    <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                            <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
                                칫솔, 볼펜, 고무장갑, 인공눈물 등 부피가 작은 것들은 재활용이 안되기 때문에 일반쓰레기로 버려야합니다.
                            </p>
                            {/* <a className="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" href="#">Turn new navigation off</a> */}
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