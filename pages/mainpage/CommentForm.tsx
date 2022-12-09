import { useAppSelector } from '@store/config';
import React, { useCallback, useState, useEffect } from 'react'

function Comments({ post }: any) {
    const id = useAppSelector((state) => state.user.value.email)
    const [commentText, setCommentText] = useState('');

    const onSubmitComment = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
        console.log(post.mid, commentText);
        e.preventDefault();
    }, [commentText]);

    const onChangeCommentText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(e.target.value);
    }, []);

    return (
        <form className='px-6' onSubmit={onSubmitComment}>
            <div className="relative">
                <input
                    type="search"
                    value={commentText} onChange={onChangeCommentText}
                    className="block w-full p-3 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="댓글을 입력해주세요"
                    required />
                <button
                    type="submit"
                    className="text-white absolute right-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    댓글쓰기
                </button>
            </div>
        </form>
    )
}

export default Comments