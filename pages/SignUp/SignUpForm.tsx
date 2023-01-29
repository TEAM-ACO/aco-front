"use client"
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useInput from '@hooks/useInput'
import { useAppDispatch } from '@store/config'
import { signup, emailAuthRequest, authnumVerifyRequest } from '@actions/signup'
import Head from 'next/head'

const BGcolor = {
    google: {
        backgroundColor: "#4285f4",
    } as React.CSSProperties,
    kakao: {
        backgroundColor: "#f9e000",
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

    const emailAuthSend = useCallback(() => {
        dispatch(emailAuthRequest({ email })).then(res => {
            console.log(res.payload);

            res.payload == undefined ? setEmailError(true) : setEmailError(false)
            res.payload ? setEmailSwitcher(true) : setEmailSwitcher(false)
        })
    }, [email])

    const authnumSend = useCallback(() => {
        dispatch(authnumVerifyRequest({ email, authNum: emailauth as unknown as number })).then(res => {
            res.payload ? setAuthSwitcher(true) : setAuthSwitcher(false)
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
        dispatch(signup({ email, name, nickname, password }))
    }, [email, password, passwordCheck]);

    return (
        <>
            <Head>
                <title>회원가입 | Project ACO</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="SignUp page" />
                <meta name="keywords" content="SignUp" />
                <meta property="og:title" content="회원가입 | Project ACO" />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:description" content="SignUp Page" />
                <meta property="og:site_name" content="ACO" />
                <meta property="og:locale" content="ko_KR" />
                <link rel="icon" sizes="100x100" href="/favicon.png" />
            </Head>
            <section className="h-screen94">
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
                                    {emailSwitcher && <div className='flex gap-2'>
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
                                <div className="flex items-center mb-6">
                                    <span>이미 아이디를 가지고 있다면?</span>
                                    <Link
                                        href="/LogIn"
                                        className="font-medium text-blue-500 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >로그인</Link>
                                </div>

                                {/* <!-- Submit button --> */}
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    회원가입
                                </button>
                            </form>
                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className="text-center font-semibold mx-4 mb-0">OR</p>
                            </div>

                            <Link
                                className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                style={BGcolor.google}
                                href="http://localhost:15251/api/oauth/chrome"
                            >
                                {/* <!-- Google --> */}
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-3.5 h-3.5 mr-2">
                                    <path
                                        fill="currentColor"
                                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                </svg>구글 계정으로 회원가입
                            </Link>
                            <Link
                                className="mb-20 slg:mb-0 px-7 py-3 text-gray-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                                style={BGcolor.kakao}
                                href="http://localhost:15251/api/oauth/kakao"
                            >
                                {/* <!-- Kakao --> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3.5 h-3.5 mr-2">
                                    <path fill="currentColor" d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"></path>
                                </svg>카카오 계정으로 회원가입
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp