"use client"
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useInput from '@hooks/useInput'
import { useAppDispatch } from '@store/config'
import { signup, emailAuthRequest, authnumVerifyRequest } from '@actions/signup'

const buttonStyle = {
    facebook: {
        backgroundColor: "#3b5998",
    } as React.CSSProperties,
    twitter: {
        backgroundColor: "#55acee",
    } as React.CSSProperties,
}

const SignUp = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [name, onChangeName] = useInput('');
    const [emailauth, onEmailauth] = useInput('');

    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [emailSwitcher, setEmailSwitcher] = useState(false);
    const [authSwitcher, setAuthSwitcher] = useState(false); 

    const [nicknameError, setNicknameError] = useState(false);
    const [mismatchError, setMismatchError] = useState(false);
    const [emailError, setEmailError] = useState(false)
    const [signUpError, setSignUpError] = useState('')
    const [signUpSuccess, setSignUpSuccess] = useState(false)

    const emailAuthSend = useCallback(()=>{      
        dispatch(emailAuthRequest({email})).then(res=>{
            console.log(res.payload);
            
            res.payload==undefined?setEmailError(true):setEmailError(false)
            res.payload? setEmailSwitcher(true):setEmailSwitcher(false)           
        })
    }, [email])

    const authnumSend = useCallback(()=>{
        dispatch(authnumVerifyRequest({email, authNum:emailauth as unknown as number})).then(res=>{
            res.payload? setAuthSwitcher(true):setAuthSwitcher(false)
        })
    }, [email, emailauth])

    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setMismatchError(e.target.value !== passwordCheck)
        // 함수 기준 외부 변수만 deps에 넣을 것.
    }, [passwordCheck]);

    const onChangePasswordCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(e.target.value);
        setMismatchError(e.target.value !== password)
    }, [password]);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!nickname) {
            return setNicknameError(true);
        }
        if (password !== passwordCheck || !password || !passwordCheck) {
            return setMismatchError(true);
        }
        if (!mismatchError && nickname) {
            console.log('=====회원가입 되는지 체크====');
            setMismatchError(false);
            setNicknameError(false);
            setSignUpError('');
            setSignUpSuccess(false);
            router.replace('/');
        }
        dispatch(signup({email, name, nickname, password}))
    }, [email, password, passwordCheck]);

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
                                {/* <!-- Email --> */}
                                <div className="mb-6 flex gap-2 flex-col">
                                    <div className='flex gap-2'>
                                        <input
                                            type="email"
                                            className="form-input block w-4/5 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="이메일을 입력해주세요."
                                            value={email || ''}
                                            onChange={onChangeEmail}
                                            disabled={emailSwitcher}
                                        />
                                        <button
                                            type="button"
                                            className="inline-block px-2 py-1 bg-blue-600 text-white font-medium text-sm leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/5"
                                            data-mdb-ripple="true"
                                            data-mdb-ripple-color="light"
                                            onClick={emailAuthSend}
                                            disabled={emailSwitcher}
                                        >
                                            인증메일 전송
                                        </button>
                                    </div>
                                    {emailError && <p>존재하는 이메일입니다.</p>}
                                    {emailSwitcher&&<div className='flex gap-2'>
                                        <input 
                                            type="text"
                                            className="form-input block w-4/5 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                            placeholder="인증번호를 입력해주세요."
                                            value={emailauth || ''}
                                            onChange={onEmailauth}
                                            disabled={authSwitcher}
                                        />
                                        <button
                                            type="button"
                                            className="inline-block px-2 py-1 bg-blue-600 text-white font-medium text-sm leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/5"
                                            data-mdb-ripple="true"
                                            data-mdb-ripple-color="light"
                                            disabled={authSwitcher}
                                            onClick={authnumSend}
                                        >
                                            인증
                                        </button>
                                    </div>}
                                    {authSwitcher && <p>인증되었습니다.</p>}
                                        
                                </div>
                                {/* <!-- Name --> */}
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-input block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="이름을 입력해주세요."
                                        value={name || ''}
                                        onChange={onChangeName}
                                    />
                                </div>
                                {/* <!-- Nickname --> */}
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-input block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="닉네임을 입력해주세요."
                                        value={nickname || ''}
                                        onChange={onChangeNickname}
                                    />
                                    {nicknameError && <p>닉네임을 입력해주세요.</p>}
                                </div>
                                {/* <!-- Password --> */}
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-input block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="비밀번호를 입력해주세요."
                                        value={password || ''}
                                        onChange={onChangePassword}
                                    />
                                </div>
                                {/* <!-- Password 재확인 --> */}
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-input block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="비밀번호 확인."
                                        value={passwordCheck || ''}
                                        onChange={onChangePasswordCheck}
                                    />
                                    {mismatchError && <p>비밀번호가 일치하지 않습니다.</p>}
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <Link
                                        href="/LogIn"
                                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >이미 아이디가 있습니다.</Link>
                                </div>

                                {/* <!-- Submit button --> */}
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Sign in
                                </button>

                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>

                                <Link
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    style={buttonStyle.facebook}
                                    href="/"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    {/* <!-- Facebook --> */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        className="w-3.5 h-3.5 mr-2"
                                    >
                                        {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                        <path
                                            fill="currentColor"
                                            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                        /></svg>Continue with Facebook
                                </Link>
                                <Link
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                                    style={buttonStyle.twitter}
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

export default SignUp