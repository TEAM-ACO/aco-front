import useInput from '@hooks/useInput';
import { Avatar } from 'flowbite-react';
import React, { useCallback } from 'react'

const Chat = () => {
    const [chat, onChangeChat, setChat] = useInput('');

    // 하다가 뭔가 이상한거 같으면 Form으로 바꿔도 괜찮습니다.
    const onSubmit = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        console.log(chat)
        setChat('')
    }, [chat]);

    return (
        <section className="px-6 py-4 h-full w-full">
            <div className='flex flex-col justify-between bg-gray-50 h-screen90'>
                <div className="h-full px-6 py-4 flex flex-col justify-end">
                    <div className='py-2 flex justify-start items-center'>
                        <Avatar
                            img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            rounded={true}
                        />
                        <span>닉네임:</span>
                        채팅입니다.
                    </div>
                    <div className='py-2 flex justify-start items-center'>
                        <Avatar rounded={true} />
                        <span>닉네임:</span>
                        채팅입니다.
                    </div>
                    <div className='py-2 flex justify-start items-center'>
                        <Avatar
                            img="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            rounded={true}
                        />
                        <span>닉네임:</span>
                        채팅입니다.
                    </div>
                    <div className='py-2 flex justify-start items-center'>
                        <Avatar rounded={true} />
                        <span>닉네임:</span>
                        채팅입니다.
                    </div>
                    <div className='py-2 flex justify-end items-center'>
                        <div className='flex items-center bg-yellow-100'>
                            <Avatar rounded={true} />
                            <span>닉네임:</span>
                            채팅입니다.
                        </div>
                    </div>
                </div>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <button
                        type="button"
                        className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg
                            aria-hidden="true"
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Upload image</span>
                    </button>
                    <input
                        type="text"
                        className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="채팅을 입력해주세요"
                        value={chat}
                        onChange={onChangeChat}
                    />
                    <button
                        type="button"
                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                        onClick={onSubmit}
                    >
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
            </div >
        </section >
    )
}

export default Chat;