import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@store/config';
import { useRouter } from 'next/navigation';
import { useCookies } from "react-cookie"
import { Spinner } from 'flowbite-react';
import useInput from '@hooks/useInput';
import { changeForgotPassword, changeNickname } from '@actions/user';
import Head from 'next/head';

const InitOauth = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { changeForgotPasswordDone, changeForgotPasswordLoading } = useAppSelector((state) => state.user);
    const [action, setAction] = useState<boolean>(false)

    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [rePassword, onChangeRePassword] = useInput('');

    const [signUpError, setSignUpError] = useState<boolean>(false);

    const onSubmit = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== rePassword) {
            return setSignUpError(true);
        }
        dispatch(changeNickname({ memberId: cookies.user.num, nickname: nickname }))
        dispatch(changeForgotPassword({ email: cookies.user.id, upassword: password }))
        setAction(true)
        setTimeout(() => {
            router.replace('/mainpage')
            setAction(false)
        }, 2000)
        setSignUpError(false)
    }, [nickname, password, rePassword])

    return (
        <>
            <Head>
                <title>회원가입 | Project ACO</title>
            </Head>
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
                                            {changeForgotPasswordLoading ?
                                                <Spinner />
                                                : '가입하기'
                                            }
                                        </button>
                                        {action && <p className='text-xs pb-1 px-4 text-red-500 font-medium'>
                                            회원가입이 완료되었습니다. 메인페이지로 이동합니다.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default InitOauth