import React, { useEffect, useState, useCallback } from 'react'
import { useCookies } from "react-cookie"
import { Navbar } from "flowbite-react";
import SearchForm from '@pages/SearchForm';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppDispatch } from '@store/config';
import { loadUserPosts } from '@actions/post';

const header = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const [myNickname, setMyNickname] = useState<string>('')
    const [userLink, setUserLink] = useState<string>('')
    const [buttonToggle, setButtonToggle] = useState<boolean>(false)

    const onLogOut = useCallback(() => {
        removeCookie('user')
        router.replace('/');
    }, [cookies])

    const onClickButton = useCallback(() => {
        setButtonToggle((prev) => !prev)
    }, [buttonToggle])

    useEffect(() => {
        if (cookies.user) {
            setUserLink(cookies.user.num)
            setTimeout(() => {
                setMyNickname(cookies.user.username.toUpperCase())
            }, 100)
        }
    }, [cookies.user])

    return (
        <>
            {!userLink ?
                <Navbar
                    className='pr-0 md:pr-10'
                    fluid={true}
                    rounded={false}
                >
                    <Navbar.Brand href="/">
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Project ACO
                        </span>
                    </Navbar.Brand>
                    <div className="flex">
                        <button
                            type="button"
                            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            onClick={onClickButton}
                        >
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className={`${buttonToggle ? "w-full md:block md:w-auto" : "w-full md:block md:w-auto hidden"}`}>
                        <ul className="mt-4 gap-3 flex flex-col md:mt-0 md:flex-row md:text-sm md:font-medium">
                            <Navbar.Link
                                href="/"
                                className={`
                            ${router.route === '/' ?
                                        "bg-gray-100 md:bg-white" : ''}`}
                            >
                                Home
                            </Navbar.Link>
                            <Navbar.Link href="/LogIn" className={`
                            ${router.route === '/LogIn' ?
                                    "bg-gray-100 md:bg-white" : ''}`}>
                                로그인
                            </Navbar.Link>
                            <Navbar.Link href="/SignUp" className={`
                            ${router.route === '/SignUp' ?
                                    "bg-gray-100 md:bg-white" : ''}`}>
                                회원가입
                            </Navbar.Link>
                        </ul>
                    </div>
                </Navbar>
                :
                <Navbar
                    className='pr-0 md:pr-10'
                    fluid={true}
                    rounded={false}
                >
                    <Navbar.Brand href="/mainpage">
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Project ACO
                        </span>
                    </Navbar.Brand>
                    <div className="flex">
                        <SearchForm />
                        <button
                            type="button"
                            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            onClick={onClickButton}
                        >
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className={`${buttonToggle ? "w-full md:block md:w-auto" : "w-full md:block md:w-auto hidden"}`}>
                        <div className='mt-3 inline-flex md:hidden'>
                            <div className="flex overflow-hidden relative items-center mx-auto w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-600">
                                <img className='h-12 object-cover' src={`http://localhost:15251/api/image/user/${userLink}`} />
                            </div>
                            <Link href="/mypage" className="ml-3 flex items-center font-medium text-sm">{myNickname}</Link>
                        </div>
                        <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:text-sm md:font-medium">
                            <Navbar.Link href="/mainpage" className={`
                            ${router.route === '/mainpage' ?
                                    "bg-gray-100 md:bg-white" : ''}`}>
                                Home
                            </Navbar.Link>
                            <Navbar.Link href="/mypage" className={`
                            ${router.route === '/mypage' ? "md:hidden px-0 mx-0 bg-gray-100"
                                    : "md:hidden px-0 mx-0"}`}>
                                마이페이지
                            </Navbar.Link>
                            <Navbar.Link href={`/user/${userLink}`} className={`
                            ${router.route === '/user/[id]' && router.query.id == userLink ?
                                    "md:hidden px-0 mx-0 bg-gray-100" : "md:hidden px-0 mx-0"}`}
                                onClick={() => {
                                    dispatch(loadUserPosts({ memberId: userLink, requestedPageNumber: 0, requestedPageSize: 10 }))
                                }}
                            >
                                내가 쓴 게시글
                            </Navbar.Link>
                            <Navbar.Link href="/category/diary" className={`
                            ${router.route === '/category/diary' ?
                                    "md:hidden px-0 mx-0 bg-gray-100" : "md:hidden px-0 mx-0"}`}>
                                다이어리
                            </Navbar.Link>
                            <Navbar.Link href="/category/tip" className={`
                            ${router.route === '/category/tip' ?
                                    "md:hidden px-0 mx-0 bg-gray-100" : 'md:hidden px-0 mx-0'}`}>
                                팁
                            </Navbar.Link>
                            <Navbar.Link href="/category/question" className={`
                            ${router.route === '/category/question' ?
                                    "md:hidden px-0 mx-0 bg-gray-100" : 'md:hidden px-0 mx-0'}`}>                                질문
                            </Navbar.Link>
                            <Navbar.Link href="/admin/member/1" className="md:hidden px-0 mx-0"
                            >
                                관리자페이지
                            </Navbar.Link>
                            <Navbar.Link href="/" className="md:ml-3 md:hidden" onClick={onLogOut}>
                                로그아웃
                            </Navbar.Link>
                        </ul>
                    </div>
                </Navbar>
            }
        </>
    )
}

export default header