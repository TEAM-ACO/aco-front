import React from 'react'
import AdminPage from './AdminPage'

const admin = () => {
    return (
        <div className=''>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mr-2">
                    <a href="#" aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">전체 보기</a>
                </li>
                <li className="mr-2">
                    <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">유저 관리</a>
                </li>
                <li className="mr-2">
                    <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">신고 관리</a>
                </li>
                <li className="mr-2">
                    <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">방문자 분석</a>
                </li>
            </ul>
            <AdminPage />
        </div>
    )
}

export default admin