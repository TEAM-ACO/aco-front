import React, { useEffect, useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@store/config'
import { changeNickname, changePassword } from '@actions/user';
import { Spinner } from 'flowbite-react';
import { useCookies } from "react-cookie"

const MyPageForm = () => {
    const dispatch = useAppDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { me, changeNicknameLoading, changeNicknameDone, changeNicknameError,
        changePasswordDone, changePasswordError, changePasswordLoading
    } = useAppSelector((state) => state.user);

    // 닉네임 변경
    const [nickname, setNickname] = useState('');
    const onChangeNickname = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }, [nickname]);

    useEffect(() => {
        if (nickname) {
            if (changeNicknameDone) {
                alert('닉네임이 변경 되었습니다.');
            }
            if (changeNicknameError) {
                alert(changeNicknameError);
            }
        }
    }, [changeNicknameDone, changeNicknameError]);

    const onNicknameSubmit = useCallback(() => {
        dispatch(changeNickname({ memberId: cookies.user.num, "nickname":nickname }));
    }, [nickname]);

    // 비밀번호 변경
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const onChangeCurrentPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    }, [currentPassword]);
    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, [password]);
    const onChangeRePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRePassword(e.target.value);
    }, [rePassword]);

    useEffect(() => {
        if (rePassword) {
            if (changePasswordDone) {
                alert('비밀번호가 변경되었습니다.');
            }
            if (changePasswordError) {
                alert(changePasswordError);
            }
        }
    }, [changePasswordDone, changePasswordError]);

    const onPasswordSubmit = useCallback(() => {
        dispatch(changePassword({ memberId: cookies.user.num, cpassword: currentPassword, upassword: rePassword }));
    }, [password]);

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">나의 회원정보</h2>
                <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="nickname"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nickname</label>
                        <input
                            type="text"
                            name="nickname"
                            id="nickname"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="닉네임을 입력하세요."
                            value={nickname}
                            onChange={onChangeNickname}
                            required />
                    </div>
                    <div className="w-full">
                        <button type="button"
                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            onClick={onNicknameSubmit}
                        >
                            {changeNicknameLoading ?
                                <Spinner aria-label="Default status example" /> :
                                '닉네임 변경'
                            }
                        </button>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="현재 비밀번호를 입력하세요."
                            onChange={onChangeCurrentPassword}
                            required />
                    </div>
                    <div className="w-full">
                        <input
                            type="password"
                            name="repass"
                            id="repass"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="변경할 비밀번호를 입력해주세요."
                            onChange={onChangePassword}
                            required />
                    </div>
                    <div className="w-full">
                        <input
                            type="password"
                            name="repass2"
                            id="repass2"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="변경할 비밀번호를 다시 입력해주세요."
                            onChange={onChangeRePassword}
                            required />
                    </div>
                    <div className="w-full">
                        <button
                            type="button"
                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            onClick={onPasswordSubmit}
                        >
                            {changePasswordLoading ?
                                <Spinner aria-label="Default status example" /> :
                                '비밀번호 변경'
                            }
                        </button>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="이메일을 입력해주세요."
                            readOnly
                            required />
                    </div>
                    {/* <div>
                        <label
                            htmlFor="gender"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Gender
                        </label>
                        <select
                            id="gender"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value={''} disabled>성별</option>
                            <option value="남성">남성</option>
                            <option value="여성">여성</option>
                            <option value="비공개">비공개</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="birth"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Birth
                        </label>
                        <input
                            type="number"
                            name="birth"
                            id="birth"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value="2022"
                            placeholder="Ex. 12"
                            required />
                    </div> */}
                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write a product description here...">Standard glass, 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US</textarea>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        회원정보 수정
                    </button>
                    {/* <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                        <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        Delete
                    </button> */}
                </div>
            </div>
        </section>
    )
}

export default MyPageForm