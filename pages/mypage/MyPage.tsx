import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@store/config'
import { changeNickname, changePassword, userWithdraw } from '@actions/user';
import { uploadImages } from '@actions/post';
import { Button, Modal, Spinner } from 'flowbite-react';
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router';

const MyPageForm = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { userWithdrawLoading } = useAppSelector((state) => state.user)
    const imageInput = useRef<any>();
    const { changeNicknameLoading, changeNicknameDone, changeNicknameError,
        changePasswordDone, changePasswordError, changePasswordLoading
    } = useAppSelector((state) => state.user);
    const [myNickname, setMyNickname] = useState('')
    const [userLink, setUserLink] = useState('')

    // 닉네임 변경
    const [nickname, setNickname] = useState(cookies.user?.username);
    const [email, setEmail] = useState('');
    const onChangeNickname = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }, [nickname]);


    const onNicknameSubmit = useCallback(() => {
        dispatch(changeNickname({ memberId: cookies.user.num, nickname: nickname }));
    }, [nickname]);

    // 비밀번호 변경
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [onWithdrawModal, setOnWithdrawModal] = useState<boolean>(false);
    const [withdrawPassword, setWithdrawPassword] = useState('');
    const [isWithdraw, setIsWithdraw] = useState<Boolean>(false)
    const [imageError, setImageError] = useState<Boolean>(false)
    const refresh: any = router.reload

    const onChangeCurrentPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    }, [currentPassword]);

    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, [password]);

    const onChangeRePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRePassword(e.target.value);
    }, [rePassword]);

    const onImageSubmit = useCallback(() => {
        if (imageInput.current.files[0] === undefined) {
            setImageError(true)
            return
        }
        console.log(imageInput.current.files[0])
        const result = new FormData;
        result.set("memberId", cookies.user.num)
        result.set("userimg", imageInput.current.files[0].name)
        result.append('file', imageInput.current.files[0])
        dispatch(uploadImages(result))
        setImageError(false)
        refresh()
    }, [imageInput.current])

    const onPasswordSubmit = useCallback(() => {
        if (password !== rePassword) {
            alert('비밀번호가 올바르지 않습니다')
        }
        dispatch(changePassword({ memberId: cookies.user.num, cpassword: currentPassword, upassword: rePassword }));
    }, [currentPassword, password, rePassword]);

    const onWithdrawPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setWithdrawPassword(e.target.value);
    }, [withdrawPassword]);

    const onWithdraw = useCallback(() => {
        dispatch(userWithdraw({ memberId: userLink, password: withdrawPassword }))
        console.log(userLink, withdrawPassword)
        setIsWithdraw(true)
        setTimeout(() => {
            removeCookie('user')
            setIsWithdraw(false)
        }, 2000)
    }, [withdrawPassword, userLink])

    const onWithdrawModalOpen = useCallback(() => {
        setOnWithdrawModal((prev) => !prev)
    }, [])

    const onWithdrawModalClose = useCallback(() => {
        setOnWithdrawModal((prev) => !prev)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setEmail(cookies.user.id)
        }, 100)
    }, [email])

    useEffect(() => {
        if (!cookies.user) {
            router.replace('/')
        }
    })

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

    useEffect(() => {
        if (cookies.user) {
            setUserLink(cookies.user.num)
            setTimeout(() => {
                setMyNickname(cookies.user.username.toUpperCase())
            }, 300)
        }
    })

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">나의 회원정보</h2>
                <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div className="w-full">
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
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="이메일을 입력해주세요."
                            value={email}
                            readOnly
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
                        <div className="mb-3 inline-flex overflow-hidden relative justify-center items-center mx-auto w-16 h-16 bg-gray-100 rounded-full dark:bg-gray-600">
                            <span className="font-medium text-gray-600 dark:text-gray-300">
                                {/* {myNickname[0]}{myNickname[1]} */}
                                <img className='h-16 object-cover' src={`http://localhost:15251/api/image/user/${userLink}`} />
                            </span>
                        </div>
                        <div className='mb-3 '>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Upload image</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700 dark:placeholder-blue-400"
                                aria-describedby="user_avatar_help" id="user_avatar" type="file"
                                ref={imageInput} />
                            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                id="user_avatar_help">
                                프로필에 올릴 이미지를 선택해주세요</div>
                        </div>
                        {imageError && <p className='text-red-500 font-medium'>이미지가 존재하지 않습니다.</p>}
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onImageSubmit}
                        type="submit"
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        이미지 변경
                    </button>
                    <button
                        onClick={onWithdrawModalOpen}
                        type="button"
                        className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                        <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        회원탈퇴
                    </button>
                </div>
            </div>
            <Modal
                show={onWithdrawModal}
                size="md"
                popup={true}
                onClose={onWithdrawModalClose}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호 입력</label>
                        <input
                            type="password"
                            className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="비밀번호를 입력하세요."
                            onChange={onWithdrawPassword}
                            required />
                        {isWithdraw ?
                            <h3 className="mb-5 text-lg font-normal text-red-500 dark:text-red-400">
                                회원탈퇴가 완료되었습니다. 잠시 후 페이지를 이동합니다.
                            </h3>
                            :
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                정말로 탈퇴 하시겠습니까?
                            </h3>
                        }
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={onWithdraw}
                                disabled={isWithdraw == true}
                            >
                                {userWithdrawLoading ?
                                    <Spinner />
                                    : '회원탈퇴'
                                }
                            </Button>
                            <Button
                                color="gray"
                                onClick={onWithdrawModalClose}
                            >
                                나가기
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default MyPageForm