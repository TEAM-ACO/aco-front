import React, { useEffect, useState, useCallback } from 'react'
import * as Yup from 'yup';
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@store/config';
import { useRouter } from 'next/navigation';
import { useCookies } from "react-cookie"
import { Spinner } from 'flowbite-react';
import useInput from '@hooks/useInput';
import { signup } from '@actions/signup';

const InitOauth = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { signupDone, signupError, signupLoading } = useAppSelector((state) => state.signup);

    const [nickname, onChangeNickname] = useInput('');
    const [name, onChangeName] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [rePassword, onChangeRePassword] = useInput('');

    const [signUpError, setSignUpError] = useState<boolean>(false);

    useEffect(() => {
        // if (action) {
        //     // Done 넣기
        //     if (signupDone) {
        //         alert('회원가입이 완료되었습니다.')
        //         router.replace('/');
        //     }
        //     if (signupError) {
        //         alert(JSON.stringify(signupError, null, 4));
        //     }
        //     action.setSubmitting(false);
        //     setAction(null);
        // }
    }, [signupDone, signupError]);

    const onSubmit = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== rePassword) {
            return setSignUpError(true);
        }
        dispatch(signup({ email: cookies.user.id, name, nickname, password }))
        setSignUpError(false)
    }, [nickname, password, rePassword])

    return (
        <form onSubmit={onSubmit}>
            <div className="flex justify-center items-center w-full h-screen90 max-w-slg mx-auto">
                <div className="w-8/12 md:w-6/12 slg:w-5/12">
                    <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 sm:p-7">
                            <div className="text-center">
                                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">회원가입 추가정보 기입</h1>
                            </div>
                            <div className="mt-5">
                                <div className="grid gap-y-4">
                                    <input
                                        type="text"
                                        className="form-input py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                        placeholder='닉네임을 입력해주세요.'
                                        value={nickname} onChange={onChangeNickname}
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="form-input py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                        placeholder='이름을 입력해주세요.'
                                        value={name} onChange={onChangeName}
                                        required
                                    />
                                    <input
                                        type="password"
                                        className="form-input py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                        placeholder='비밀번호를 입력해주세요.'
                                        value={password} onChange={onChangePassword}
                                        required
                                    />
                                    <input
                                        type="password"
                                        className="form-input py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                        placeholder='비밀번호를 다시 한 번 입력해주세요.'
                                        value={rePassword} onChange={onChangeRePassword}
                                        required
                                    />
                                    {signUpError && <p className='text-xs pb-1 px-4 text-red-500 font-medium'>비밀번호가 일치하지 않습니다.</p>}
                                    <button
                                        type="submit"
                                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                        {signupLoading ?
                                            <Spinner />
                                            : '가입하기'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default InitOauth