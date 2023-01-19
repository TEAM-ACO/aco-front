import React, { useEffect, useState, useCallback } from 'react'
import { useCookies } from "react-cookie"
import { Navbar } from "flowbite-react";
import SearchForm from '@pages/SearchForm';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppDispatch } from '@store/config';
import { loadMenu, loadUserPosts } from '@actions/post';

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
                            >
                                Home
                            </Navbar.Link>
                            <Navbar.Link href="/LogIn">
                                로그인
                            </Navbar.Link>
                            <Navbar.Link href="/SignUp">
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
                                {/* <span className="font-medium text-gray-600 dark:text-gray-300">
                                    {myNickname[0]}{myNickname[1]}
                                </span> */}
                                <img className='h-12 object-cover' src={`http://localhost:15251/api/image/user/${userLink}`} />
                            </div>
                            <Link href="/mypage" className="ml-3 flex items-center font-medium text-sm">{myNickname}</Link>
                        </div>
                        <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:text-sm md:font-medium">
                            <Navbar.Link
                                href="/mainpage"
                            // active={`${router.route === '/mainpage' ? false : true}` as any}
                            >
                                Home
                            </Navbar.Link>
                            <Navbar.Link href="/mypage" className="md:hidden px-0 mx-0"
                            // active={`${router.route === '/mypage' ? true : false}` as any}
                            >
                                마이페이지
                            </Navbar.Link>
                            <Navbar.Link href={`/user/${userLink}`} className="md:hidden px-0 mx-0"
                                onClick={() => {
                                    dispatch(loadUserPosts({ memberId: userLink, requestedPageNumber: 0, requestedPageSize: 10 }))
                                    // active={`${router.route === `/user/${userLink}` ? true : false}` as any}
                                }}>
                                내가 쓴 게시글
                            </Navbar.Link>
                            <Navbar.Link href="/category/diary" className="md:hidden px-0 mx-0"
                                // active={`${router.route === '/category/diary' ? true : false}` as any}
                                onClick={() => {
                                    dispatch(loadMenu({ num: 0, menu: "Diary", requestedPageNumber: 0, requestedPageSize: 10 }))
                                }}>
                                다이어리
                            </Navbar.Link>
                            <Navbar.Link href="/category/tip" className="md:hidden px-0 mx-0"
                                // active={`${router.route === '/category/tip' ? true : false}` as any}
                                onClick={() => {
                                    dispatch(loadMenu({ num: 1, menu: "Tip", requestedPageNumber: 0, requestedPageSize: 10 }))
                                }}>
                                팁
                            </Navbar.Link>
                            <Navbar.Link href="/category/question" className="md:hidden px-0 mx-0"
                                // active={`${router.route === '/category/question' ? true : false}` as any}
                                onClick={() => {
                                    dispatch(loadMenu({ num: 2, menu: "Question", requestedPageNumber: 0, requestedPageSize: 10 }))
                                }}>
                                질문
                            </Navbar.Link>
                            <Navbar.Link href="/admin" className="md:hidden px-0 mx-0"
                            // active={`${router.route === '/admin' ? true : false}` as any}
                            >
                                관리자페이지
                            </Navbar.Link>
                            <Navbar.Link href="/" className="md:ml-3 md:hidden" onClick={onLogOut} active={true}>
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