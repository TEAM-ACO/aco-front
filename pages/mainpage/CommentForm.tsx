import { useAppSelector } from '@store/config';
import React, { useCallback, useState, useEffect } from 'react'

function Comments({ post }: any) {
    const memberId = useAppSelector((state) => state.user) // me에 들어있는거로 받으면 될 듯
    const [commentText, setCommentText] = useState('');

    const onSubmitComment = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
        // Channel을 다른 링크로 보내야 에러가 안나는 것 같다. (시도 안해봤음)
        if (commentText == '') {
            return alert('댓글을 입력해주세요')
        }
        console.log(post.mid, commentText);
        e.preventDefault();
        setCommentText('')
    }, [commentText]);

    const onChangeCommentText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(e.target.value);
    }, []);

    return (
        <form className='px-6' onSubmit={onSubmitComment}>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <input
                    value={commentText} onChange={onChangeCommentText}
                    id="comment"
                    className="block mr-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="댓글을 입력하세요" />
                <button
                    type="submit"
                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6 rotate-90"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                    <span className="sr-only">Send message</span>
                </button>
            </div>
        </form>
    )
}

export default Comments