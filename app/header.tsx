import Link from 'next/link'
import React from 'react'
import { Navbar, DarkThemeToggle, Flowbite } from "flowbite-react";

const header = () => {
    return (
        <Navbar
            className='mr-0 md:mr-10'
            fluid={true}
            rounded={false}
        >
            <Navbar.Brand href="/">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Project ACO
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link
                    href="/"
                    active={true}
                >
                    Home
                </Navbar.Link>
                <Navbar.Link href="/mainpage">
                    메인페이지(임시)
                </Navbar.Link>
                <Navbar.Link href="/">
                    임시
                </Navbar.Link>
                <Navbar.Link href="/LogIn">
                    로그인
                </Navbar.Link>
                <Navbar.Link href="/SignUp">
                    회원가입
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default header