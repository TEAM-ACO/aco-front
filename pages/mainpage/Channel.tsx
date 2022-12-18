import { Avatar } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

function Channel() {
    return (
        <div className="px-6 py-3">
            <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                </div>
                <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>
            <aside className="w-64 mt-4" aria-label="Sidebar">
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
                            Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your profile.
                        </p>
                        <a className="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" href="#">Turn new navigation off</a>
                    </div>
                    접속중인 유저? 여기 넣을 컨텐츠 생각
                    {/* 유저 이미지 */}
                    <div className="p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                        <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            <li>
                                <Link href="#" className="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Avatar
                                        img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                        rounded={true}
                                    />
                                    <div className="ml-3 text-gray-600 dark:text-gray-400">
                                        <div className="text-base font-normal">이름적기</div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Avatar
                                        img="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                        rounded={true}
                                    />
                                    <div className="ml-3 text-gray-600 dark:text-gray-400">
                                        <div className="text-base font-normal">이름적기</div>
                                    </div>
                                </Link>
                            </li>
                        </ol>
                    </div>

                </div>
            </aside>
        </div>
    )
}

export default Channel