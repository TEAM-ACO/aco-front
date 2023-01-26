import React, { useCallback, useEffect, useState } from 'react'

import { useCookies } from 'react-cookie';
import Link from 'next/link';
import wrapper, { useAppDispatch, useAppSelector } from '@store/config';
import { loadMenu, loadUserPosts } from '@actions/post';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

function OffCanvas() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    // const [cookies2, setCookie2, removeCookie2] = useCookies(['refresh']);
    // const [cookies3, setCookie3, removeCookie3] = useCookies(['access']);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { mainPosts } = useAppSelector((state) => state.post);

    const [myNickname, setMyNickname] = useState('')
    const [userLink, setUserLink] = useState('')

    const onLogOut = useCallback(() => {
        removeCookie('user')
        // removeCookie2('refresh')
        // removeCookie3('access')
        router.replace('/');
    }, [cookies.user])

    useEffect(() => {
        if (!router.isReady) return;
        if (cookies.user) {
            setUserLink(cookies.user.num)
            setTimeout(() => {
                setMyNickname(cookies.user.username.toUpperCase())
            }, 300)
        }
    }, [mainPosts])

    return (
        <div className='relative z-10'>
            <div>
                <nav className="flex flex-col h-screen94 md:w-64 w-0 z-40 px-4 overflow-y-auto bg-purple-900 tex-gray-900 border border-purple-900">
                    <div className="flex flex-wrap mt-8">
                        <div className="ml-4 w-1/4">
                            <div className="inline-flex overflow-hidden relative justify-center items-center mx-auto w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-600">
                                <img className='h-16 object-cover' src={`http://localhost:15251/api/image/user/${userLink}`} />
                            </div>
                        </div>
                        <div className="ml-6 w-2/4">
                            <span className="font-semibold text-white">
                                {myNickname}
                            </span>
                            <button className="mt-2 text-sm bg-green-500 text-white px-4 py-2 rounded-md border border-blue-500 hover:bg-white hover:text-green-500"
                            >
                                <Link href='/mypage'>
                                    마이페이지
                                </Link>
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 mb-4">
                        <ul className="ml-4">
                            <li className={router.route === '/user/[id]' && router.query.id == userLink ?
                                `${'mb-2 px-4 py-3 flex flex-row text-black bg-gray-300 font-bold rounded-lg'}` :
                                "mb-2 px-4 py-3 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded-lg"
                            }>                                <span>
                                    <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                                        <path
                                            d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
                                                014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
                                                8-4z"
                                        ></path>
                                    </svg>
                                </span>
                                <a href={`/user/${userLink}`}
                                    className={router.route === '/user/[id]' && router.query.id == userLink ?
                                        "pointer-events-none" :
                                        ""
                                    }
                                    onClick={() => {
                                        // 여기에도 무한스크롤 가능하게
                                        dispatch(loadUserPosts(
                                            { memberId: userLink, requestedPageNumber: 0, requestedPageSize: 10 }
                                        ))
                                    }}>
                                    <span className="ml-2">내가 쓴 게시글</span>
                                </a>
                            </li>
                            <li className={router.route === '/category/diary' ?
                                `${'mb-2 px-4 py-3 flex flex-row text-black bg-gray-300 font-bold rounded-lg'}` :
                                "mb-2 px-4 py-3 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded-lg"
                            }>
                                <span>
                                    <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                                        <path
                                            d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
                                                2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
                                                00-2-2h-1V1m-1 11h-5v5h5v-5z"
                                        ></path>
                                    </svg>
                                </span>
                                <Link href="/category/diary"
                                    className={router.route === '/category/diary' ?
                                        "pointer-events-none" :
                                        ""
                                    }>
                                    <span className="ml-2">다이어리</span>
                                </Link>
                            </li>
                            <li className={router.route === '/category/tip' ?
                                `${'mb-2 px-4 py-3 flex flex-row text-black bg-gray-300 font-bold rounded-lg'}` :
                                "mb-2 px-4 py-3 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded-lg"
                            }>
                                <span>
                                    <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                                        <path
                                            d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                                                4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                                                4h4v-4h-4M4 8h4V4H4v4z"
                                        ></path>
                                    </svg>
                                </span>
                                <Link href="/category/tip"
                                    className={router.route === '/category/tip' ?
                                        "pointer-events-none" :
                                        ""
                                    }>
                                    <span className="ml-2">팁</span>
                                </Link>
                            </li>
                            <li className={router.route === '/category/question' ?
                                `${'mb-2 px-4 py-3 flex flex-row text-black bg-gray-300 font-bold rounded-lg'}` :
                                "mb-2 px-4 py-3 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded-lg"
                            }>
                                <span>
                                    <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                                        <path
                                            d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                                                4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                                                4h4v-4h-4M4 8h4V4H4v4z"
                                        ></path>
                                    </svg>
                                </span>
                                <Link href="/category/question"
                                    className={router.route === '/category/question' ?
                                        "pointer-events-none" :
                                        ""
                                    }>
                                    <span className="ml-2">질문</span>
                                </Link>
                            </li>
                            <li className="mb-2 px-4 py-3 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded-lg">
                                <span>
                                    <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                                        <path
                                            d="M12 13H7v5h5v2H5V10h2v1h5v2M8
                                                4v2H4V4h4m2-2H2v6h8V2m10 9v2h-4v-2h4m2-2h-8v6h8V9m-2
                                                9v2h-4v-2h4m2-2h-8v6h8v-6z"
                                        ></path>
                                    </svg>
                                </span>
                                <a href="/admin/member/1">
                                    <span className="ml-2">관리자페이지</span>
                                </a>
                            </li>
                            <li className="mb-2 px-4 py-3 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded-lg">
                                <span>
                                    <svg
                                        className="fill-current h-5 w-5 "
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </span>
                                <a href='/' onClick={onLogOut}>
                                    <span className="ml-2">로그아웃</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {

    await store.dispatch(loadMenu());

    return { props: {} }
})

export default OffCanvas;