import React from 'react'
import { Avatar } from 'flowbite-react'
import dayjs from 'dayjs';

function CommentList({ comment }: any) {
    const date = dayjs("2022-12-12").format("YY-MM-DD");
    return (
        <li className="ml-6 flex items-center justify-between">
            <div className='flex items-center'>
                <Avatar
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded={true}
                />
                {/* <span className="flex justify-center items-center mr-2 w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <circle className="flex justify-center items-center rounded-full shadow-lg" />
                </span> */}
                <div className='mr-5 w-10'>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{comment.User.nickname}</span>
                </div>
                <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                    {comment.content}
                </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                <time className="mb-1 mr-3 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                    {date}
                </time>
            </div>
        </li>
    )
}

export default CommentList