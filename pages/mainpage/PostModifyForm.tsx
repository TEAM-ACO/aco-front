import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '@store/config'
import ReactTextareaAutosize from 'react-textarea-autosize';
import { Spinner } from 'flowbite-react';
import { addPost, editPost } from '@actions/post';
import { useCookies } from 'react-cookie';
import Select from 'react-select';
import { useRouter } from 'next/router';
import { IArticle } from '@features/postSlice';
import _find from 'lodash'

const options = [
    { value: "Diary", label: 'Diary' },
    { value: 'Tip', label: 'Tip' },
    { value: 'Question', label: 'Question' },
];

type PostProps = {
    post: IArticle
}

// 기본 이미지 넣기
function PostModifyForm({ post }: PostProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [selectedOption, setSelectedOption] = useState<any>(post.menu == 'Diary' ? options[0] :
        post.menu == 'Tip' ? options[1] : options[2]);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { addPostDone, addPostLoading, addPostError } = useAppSelector((state) => state.post);

    useEffect(() => {
        if (addPostDone) {
            setText('');
            setTagList([]);
            setTagItem('');
        }
    }, [addPostDone]);

    const imageInput = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [text, setText] = useState<string>(post.articleContext)
    const [tagItem, setTagItem] = useState<string>('')
    const [tagList, setTagList] = useState<string[]>(post.tags)
    const [textError, setTextError] = useState<boolean>(false);
    const [tagError, setTagError] = useState<boolean>(false);

    const onSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const refresh: any = router.reload
        const result = new FormData;
        if (!text || !text.trim()) {
            setTextError(true)
            return
        }
        setTextError(false)
        result.set("articleContext", text)
        result.set("menu", selectedOption.value)
        result.set("memberId", cookies.user.num)
        result.set("tags", tagList.join(", "))
        result.set("articleId", (post.articleId) as any)

        if (imageInput.current.files) {
            for (let i = 0; i < imageInput.current.files.length; i++) {
                result.append("articleImagesNames", imageInput.current.files[i])
            }
        }
        dispatch(editPost(result));
        // dispatch(editPost({
        //     articleId: post.articleId, articleImagesNames: post.articleImagesNames,
        //     tags: post.tags, articleContext: post.articleContext, name: post.member.nickname,
        //     menu: post.menu
        // }))
        // refresh(window.location.pathname)
    }, [text, tagList])

    const onChangeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }, []);

    const onChangehashText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTagItem(e.target.value);
    }, [])

    const onKeyPress = useCallback((e: React.KeyboardEvent<HTMLElement> | any) => {
        if (e.target.value.length !== 0 && e.key === 'Enter') {
            submitTagItem();
        }
    }, [tagItem, tagList])

    const submitTagItem = useCallback(() => {
        if (tagList.length >= 10) {
            alert('태그는 10개까지 등록할 수 있습니다.')
            return
        }
        let updatedTagList = [...tagList]
        if (updatedTagList.includes(tagItem)) {
            setTagError(true)
            return
        }
        updatedTagList.push(tagItem)
        setTagList(updatedTagList)
        setTagError(false)
        setTagItem('')
    }, [tagItem, tagList])

    const deleteTagItem = useCallback((e: React.MouseEvent<HTMLButtonElement> | any) => {
        const deleteTagItem = e.target.parentElement.firstChild.innerText
        const filteredTagList = tagList.filter(tagItem => tagItem !== deleteTagItem)
        setTagList(filteredTagList)
    }, [tagItem, tagList])

    const onClickImageUpload = useCallback(() => {
        if (!imageInput.current) {
            return;
        }
        imageInput.current.click();
    }, [imageInput.current]);


    return (
        <div className='w-full'>
            <div className="px-6">
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
                    {textError && <p className='text-xs pb-1 px-4 text-red-500 font-medium'>게시글을 입력해주세요.</p>}
                    {/* 해시태그 등록 */}
                    <div className="mb-2 px-4 h-full">
                        <div className="flex items-center flex-wrap text-xs"
                        >
                            {tagList.map((tagItem, index) => {
                                return (
                                    <div className='flex items-center justify-between px-2 ml-1 my-1
                                    text-white bg-sky-300 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 rounded-lg dark:bg-sky-500 dark:hover:bg-sky-600 focus:outline-none dark:focus:ring-sky-600
                                    '
                                        key={index}>
                                        <span>{tagItem}</span>
                                        <button
                                            type="button"
                                            className="py-1 pl-2 text-sm font-medium text-gray-100 focus:outline-none rounded-lg border border-gray-200 hover:text-indigo-900 focus:z-10  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            onClick={deleteTagItem}
                                        >X</button>
                                    </div>
                                )
                            })}
                            <input
                                type="text"
                                id="small-input"
                                placeholder="태그를 입력해주세요"
                                onChange={onChangehashText}
                                value={tagItem}
                                onKeyDown={onKeyPress}
                                className="block p-2 mt-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    {tagError && <p className='text-xs py-1 px-4 text-red-500 font-medium'>이미 등록된 태그입니다.</p>}
                    <Select
                        className="px-4 py-2"
                        id="long-value-select"
                        instanceId="long-value-select"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                    />
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button
                            type="button"
                            className="ml-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                            onClick={onSubmit}
                        >
                            {addPostLoading ?
                                <Spinner aria-label="Default status example" /> :
                                '수정하기'
                            }
                        </button>
                        {/* 이미지 업로드 */}
                        <div className="flex pl-0 space-x-1 sm:pl-2">
                            <input type="file"
                                accept='image/*'
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModifyForm