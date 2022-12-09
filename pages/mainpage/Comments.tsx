import React from 'react'

function Comments() {
    return (
        <div className='px-6'>
            <div className="relative">
                <input
                    type="search"
                    id="search"
                    className="block w-full p-3 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required />
                <button
                    type="submit"
                    className="text-white absolute right-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    댓글쓰기
                </button>
            </div>
        </div>
    )
}

export default Comments