import React, { useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@store/config'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useInput from '@hooks/useInput';
import { changeForgotPassword, findPasswordEmail, findpassAuthRequest } from '@actions/user';
import { Spinner } from 'flowbite-react';

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { findpasswordLoading, findpasswordDone,
        findpassAuthLoading, findpassAuthDone } = useAppSelector((state) => state.user);

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
        console.log("===============>>>>" + findpassEmail, authNumber)
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
        dispatch(changeForgotPassword({ upassword: changeRepass }));
        setChangePassError(false)
        setChangeRepassError(false)
    }, [changePass, changeRepass]);

    return (
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
                        {findpassAuthDone ?
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
                                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                        {findpassAuthLoading ?
                                            <Spinner aria-label="Default status example" /> :
                                            '비밀번호 변경'
                                        }
                                    </button>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ForgotPassword