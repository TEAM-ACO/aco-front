"use client"
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import useInput from '@hooks/useInput'
import { useAppDispatch, useAppSelector } from '@store/config'
import { login } from '@actions/user'

const BGcolor = {
    google: {
        backgroundColor: "#3b5998",
    } as React.CSSProperties,
    twitter: {
        backgroundColor: "#55acee",
    } as React.CSSProperties,
}

const LogIn = () => {
    // Redux의 state를 변화 시킬 수 있습니다 (action이 발생)
    const dispatch = useAppDispatch();
    const router = useRouter();
    // Redux의 reducer를 가져옵니다.
    const { loginLoading, loginError, loginDone } = useAppSelector((state) => state.user);

    const [email, onChangeEmail] = useInput<string>('');
    const [password, onChangePassword] = useInput<string>('');

    const [logInError, setLogInError] = useState<boolean>(false);
    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, password)
        if (!email) {
            return setLogInError(true);
        }
        if (!password) {
            return setLogInError(true);
        }
        setLogInError(false);
        dispatch(login({ email, password }));
        // 뒤로가기 눌러도 페이지 고정

        router.replace('/mainpage');

        // if (loginError) {
        //     // alert 넣을 것
        //     alert('틀')
        // }
    },
        [email, password],
    );
    return (
        <>
            <section className="h-screen">
                <div className="container px-6 py-12 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="w-full"
                                alt="Phone image"
                            />
                        </div>
                        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                            <form onSubmit={onSubmit}>
                                {/* <!-- Email input --> */}
                                <div className="mb-6">
                                    <input
                                        type="email"
                                        className="form-input block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="이메일을 입력해주세요"
                                        value={email} onChange={onChangeEmail}
                                    />
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-input block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="비밀번호를 입력해주세요"
                                        value={password} onChange={onChangePassword}
                                    />
                                </div>
                                {logInError && <p>이메일 혹은 비밀번호가 일치하지 않습니다.</p>}
                                <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="exampleCheck3"
                                        />
                                        <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
                                        >아이디 기억하기</label>
                                    </div>
                                    <Link
                                        href="/forgotpass"
                                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >비밀번호 찾기</Link>
                                </div>

                                {/* <!-- Submit button --> */}
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Log-in
                                </button>

                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>

                                <Link
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    style={BGcolor.google}
                                    href="#"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    {/* <!-- Google --> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3.5 h-3.5 mr-2">
                                        {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                        <path
                                            fill="currentColor"
                                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                    </svg>Continue with Google
                                </Link>
                                <Link
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                                    style={BGcolor.twitter}
                                    href="/"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    {/* <!-- Twitter --> */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        className="w-3.5 h-3.5 mr-2"
                                    >
                                        {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                        <path
                                            fill="currentColor"
                                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                        /></svg>Continue with Twitter
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LogIn