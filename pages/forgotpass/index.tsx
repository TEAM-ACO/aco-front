import React, { useState, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/config'
import Link from 'next/link'
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router'
import useInput from '@hooks/useInput';
import { changeForgotPassword, findPasswordEmail, findpassAuthRequest } from '@actions/user';
import { Spinner } from 'flowbite-react';
import Head from 'next/head';

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const { findpasswordLoading, findpasswordDone,
        findpassAuthLoading, findpassAuthDone,
        changeForgotPasswordDone, changeForgotPasswordLoading
    } = useAppSelector((state) => state.user);

    const [findpassEmail, onChangeFindpassEmail] = useInput('');
    const [authNumber, onChangeAuthNumber] = useInput('');

    const [findError, setFindError] = useState<boolean>(false);
    const [authError, setAuthError] = useState<boolean>(false);
    const [authSwitch, setAuthSwitch] = useState<boolean>(false);

    const [changePass, onChangeChangePass] = useInput('');
    const [changeRepass, onChangeChangeRepass] = useInput('');

    const [changePassError, setChangePassError] = useState<boolean>(false);
    const [changeRepassError, setChangeRepassError] = useState<boolean>(false);

    const onSubmit = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (findpassEmail === '') {
            return setFindError(true)
        }
        dispatch(findPasswordEmail({ email: findpassEmail }));
        setFindError(false)
        setAuthSwitch(true)
    }, [findpassEmail]);

    const onAuthSubmit = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (authNumber === '' && authSwitch === false && findpasswordDone === false) {
            return setAuthError(true)
        }
        dispatch(findpassAuthRequest({ email: findpassEmail, authNum: authNumber as unknown as number }))
        // 변경할 비밀번호 창으로 넘기기
        setAuthError(false)
    }, [authNumber, authSwitch, findpassEmail, findpasswordDone]);

    const onPassChangeSubmit = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (changePass === '') {
            return setChangePassError(true)
        } else if (changePass !== changeRepass) {
            setChangePassError(false)
            return setChangeRepassError(true)
        }
        dispatch(changeForgotPassword({ email: findpassEmail, upassword: changeRepass }));
        setChangePassError(false)
        setChangeRepassError(false)
        setTimeout(() => {
            router.replace('/LogIn')
        }, 3000)
    }, [changePass, changeRepass, findpassEmail]);

    useEffect(() => {
        if (cookies.user) {
            router.replace('/mainpage', undefined, { shallow: true })
        }
    })

    return (
        <>
            <Head>
                <title>비밀번호찾기 | Project ACO</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="ForgotPass page" />
                <meta name="keywords" content="ForgotPass" />
                <link rel="icon" sizes="100x100" href="/favicon.png" />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:title" content="비밀번호찾기 | Project ACO" />
                <meta property="og:description" content="ForgotPass page" />
                <meta property="og:site_name" content="ACO" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <main id="content" role="main" className="flex justify-center items-center w-full h-screen90 max-w-slg mx-auto">
                <div className="w-8/12 md:w-6/12 slg:w-5/12">
                    <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 sm:p-7">
                            <div className="text-center">
                                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">비밀번호를 잊으셨습니까?</h1>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    비밀번호가 기억난다면?
                                    <Link className="text-blue-600 decoration-2 hover:underline font-medium" href="/LogIn">
                                        로그인 화면으로
                                    </Link>
                                </p>
                            </div>
                            {!findpassAuthDone ?
                                // 인증번호 입력 전
                                (<div className="mt-5">
                                    <div className="grid gap-y-4">
                                        <div>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="form-input py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                                    placeholder='이메일을 입력해주세요.'
                                                    required aria-describedby="email-error"
                                                    value={findpassEmail} onChange={onChangeFindpassEmail}
                                                />
                                            </div>
                                            <div className={findError ? '' : 'hidden'}>
                                                <p className="text-xs text-red-600 mt-2" id="email-error">
                                                    이메일이 올바르지 않습니다.
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={onSubmit}
                                            type="button"
                                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                            {findpasswordLoading ?
                                                <Spinner aria-label="Default status example" /> :
                                                '이메일 발송'
                                            }
                                        </button>
                                        <div>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="auth"
                                                    name="auth"
                                                    className="form-input py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                                    placeholder='발송된 인증번호를 입력해주세요.'
                                                    required
                                                    value={authNumber} onChange={onChangeAuthNumber}
                                                />
                                            </div>
                                            <div className={authError ? '' : 'hidden'}>
                                                <p className="text-xs text-red-600 mt-2" id="auth-error">
                                                    인증번호가 올바르지 않습니다.
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={onAuthSubmit}
                                            type="button"
                                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                            {findpassAuthLoading ?
                                                <Spinner aria-label="Default status example" /> :
                                                '비밀번호 찾기'
                                            }
                                        </button>
                                    </div>
                                </div>) :
                                /* 인증번호를 입력했다면 */
                                (<div className="mt-5">
                                    <div className="grid gap-y-4">
                                        <div>
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    className="form-input py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                                    placeholder='변경할 비밀번호를 입력해주세요.'
                                                    required
                                                    value={changePass} onChange={onChangeChangePass}
                                                />
                                            </div>
                                            <div className={changePassError ? '' : 'hidden'}>
                                                <p className="text-xs text-red-600 mt-2" id="email-error">
                                                    비밀번호가 올바르지 않습니다.
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    className="form-input py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                                    placeholder='비밀번호를 다시 입력해주세요.'
                                                    required
                                                    value={changeRepass} onChange={onChangeChangeRepass}
                                                />
                                            </div>
                                            <div className={changeRepassError ? '' : 'hidden'}>
                                                <p className="text-xs text-red-600 mt-2" id="auth-error">
                                                    비밀번호가 같지 않습니다.
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={onPassChangeSubmit}
                                            type="button"
                                            disabled={changeForgotPasswordDone}
                                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                            {changeForgotPasswordLoading ?
                                                <Spinner aria-label="Default status example" /> :
                                                '비밀번호 변경'
                                            }
                                        </button>
                                        {changeForgotPasswordDone &&
                                            <div className='flex'>
                                                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                                    <svg aria-hidden="true"
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <p className='ml-2 flex items-center font-medium text-sm text-red-500'>비밀번호가 변경되었습니다. 3초 뒤에 로그인 화면으로 이동합니다</p>
                                            </div>
                                        }
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ForgotPassword