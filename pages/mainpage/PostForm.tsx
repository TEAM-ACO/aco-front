import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '@store/config'
import ReactTextareaAutosize from 'react-textarea-autosize';
import { addPosts } from '@features/postSlice';
import { TextInput } from 'flowbite-react';

function PostForm() {
    const dispatch = useAppDispatch();
    const { addPostDone, addPostError } = useAppSelector((state) => state.post);

    useEffect(() => {
        if (addPostDone) {
            setText('');
        }
    }, [addPostDone]);

    const imageInput = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [text, setText] = useState<string>('')
    const [tagText, setTagText] = useState<string>('')


    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current])

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text || !text.trim()) {
            return alert('게시글을 작성하세요.');
        }
        // console.log(text)
        dispatch(addPosts(text));
    }, [text])

    const onChangeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }, []);

    const onChangeTagText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTagText(e.target.value);
    }, [])

    const onHashtag = useCallback((e: any) => {
        console.log(tagText)
        e.preventDefault();
        setTagText('');
    }, [tagText])

    // 그냥 물어보기
    return (
        <div>
            {/* 글 쓰면 새로고침 되는 문제 어떻게 고치지? */}
            <form className="px-6" encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="shadow-lg pb-2 w-full mb-4 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <ReactTextareaAutosize
                            value={text}
                            onChange={onChangeText}
                            minRows={3}
                            className="w-full resize-none px-3 py-3 text-sm text-gray-900 bg-white border-1 border-gray-300 rounded-lg dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="내용을 입력해주세요"
                        />
                    </div>
                    <TextInput
                        className='px-4'
                        id="small"
                        type="text"
                        sizing="sm"
                        placeholder="태그를 입력해주세요"
                        onChange={onChangeTagText}
                        value={tagText}
                    />
                    <button onKeyDown={onHashtag} ></button>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button
                            type="submit"
                            className="ml-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            글쓰기
                        </button>
                        <div className="flex pl-0 space-x-1 sm:pl-2">
                            {/* <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Attach file</span>
                            </button>
                            <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Set location</span>
                            </button> */}
                            <input type="file"
                                multiple
                                hidden
                                ref={imageInput}
                            />
                            <button
                                className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                onClick={onClickImageUpload}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Upload image</span>
                            </button>
                            {/* <div>
                                {articleImage.map((v: any) => {
                                    return (
                                        <div key={v} style={{ display: 'inline-block' }}>
                                            <img src={'http://localhost:3075/' + v} style={{ width: '200px' }} alt={v} />
                                            <div>
                                                <button>제거</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div> */}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostForm