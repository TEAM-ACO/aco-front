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
                        <Link href="/admin/member/1"
                            className={`inline-block p-4 rounded-t-lg 
                            ${router.route === "/admin/member/[pid]" ? "pointer-events-none text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                            멤버 관리</Link>
                    </li>
                    {/* 조회, 삭제만 */}
                    <li className="mr-2">
                        <Link href="/admin/article/1"
                            prefetch={false}
                            className={`inline-block p-4 rounded-t-lg 
                            ${router.route === "/admin/article/[pid]" ? "pointer-events-none text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                            게시글 관리</Link>
                    </li>
                    <li className="mr-2">
                        <Link href="/admin/reportarticle/1"
                            className={`inline-block p-4 rounded-t-lg 
                            ${router.route === "/admin/reportarticle/[pid]" ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                                    : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                            게시글 신고 관리</Link>
                    </li>
                    <li className="mr-2">
                        <Link href="/admin/reportmember/1"
                            className={`inline-block p-4 rounded-t-lg 
                            ${router.route === "/admin/reportmember/[pid]" ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
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