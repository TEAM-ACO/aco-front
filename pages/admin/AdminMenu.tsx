import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

const AdminMenu = ({ children }: {
    children: React.ReactNode
}) => {
    const router = useRouter();

    return (
        <div>
            <hr />
            <div className='px-7 py-7'>
                <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mr-2">
                        <Link href="/admin"
                            className={`inline-block p-4 rounded-t-lg 
                            ${router.pathname === "/admin" ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                            방문자 분석</Link>
                    </li>
                    <li className="mr-2">
                        <Link href="/admin/member"
                            className={`inline-block p-4 rounded-t-lg 
                            ${router.pathname === "/admin/member" ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                            멤버 관리</Link>
                    </li>
                    {/* 조회, 삭제만 */}
                    <li className="mr-2">
                        <Link href="/admin/article"
                            className={`inline-block p-4 rounded-t-lg 
                            ${router.pathname === "/admin/article" ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                            게시글 관리</Link>
                    </li>
                    <li className="mr-2">
                        <Link href="/admin/reportarticle"
                            className={`inline-block p-4 rounded-t-lg 
                            ${router.pathname === "/admin/reportarticle" ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                            게시글 신고 관리</Link>
                    </li>
                    <li className="mr-2">
                        <Link href="/admin/reportmember"
                            className={`inline-block p-4 rounded-t-lg 
                            ${router.pathname === "/admin/reportmember" ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                            멤버 신고 관리</Link>
                    </li>
                </ul>
                {children}
            </div>
        </div>
    )
}

export default AdminMenu