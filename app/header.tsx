import React, { useEffect, useState } from 'react'
import { useCookies } from "react-cookie"
import { Navbar } from "flowbite-react";
import SearchForm from '@pages/SearchForm';

const header = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [headerCookie, setHeaderCookie] = useState<boolean>()

    useEffect(() => {
        if (cookies.user === undefined) {
            setHeaderCookie(true)
            return
        } else {
            setHeaderCookie(false)
        }
        console.log(headerCookie)
    }, [headerCookie])

    return (
        <>
            {headerCookie ?
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
                        <SearchForm />
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        <Navbar.Link href="/" className="md:hidden px-0 mx-0">
                            내가 쓴 게시글
                        </Navbar.Link>
                        <Navbar.Link href="/" className="md:hidden px-0 mx-0">
                            내가 좋아요한 게시글
                        </Navbar.Link>
                        <Navbar.Link
                            href="/"
                            active={true}
                        >
                            Home
                        </Navbar.Link>
                        <Navbar.Link href="/LogIn">
                            로그인
                        </Navbar.Link>
                        <Navbar.Link href="/SignUp">
                            회원가입
                        </Navbar.Link>
                    </Navbar.Collapse>
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
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        <Navbar.Link href="/" className="md:hidden px-0 mx-0">
                            내가 쓴 게시글
                        </Navbar.Link>
                        <Navbar.Link href="/" className="md:hidden px-0 mx-0">
                            내가 좋아요한 게시글
                        </Navbar.Link>
                        <Navbar.Link
                            href="/mainpage"
                        >
                            Home
                        </Navbar.Link>
                        <Navbar.Link href="/" active={true}>
                            로그아웃
                        </Navbar.Link>
                    </Navbar.Collapse>
                </Navbar>
            }
        </>
    )
}

export default header