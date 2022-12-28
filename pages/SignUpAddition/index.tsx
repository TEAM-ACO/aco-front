import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@store/config';
import { useRouter } from 'next/navigation';

const SignupSchema = Yup.object().shape({
    user_nickname: Yup.string()
        .required('닉네임을 입력해주세요.'),
    user_password: Yup.string()
        .required('비밀번호를 입력해주세요.'),
    user_password_check: Yup.string()
        .oneOf([Yup.ref('user_password')], '비밀번호가 일치 하지 않습니다.')
        .required('비밀번호 확인을 입력해주세요.'),
});

const SignUpAddition = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { me } = useAppSelector((state) => state.user);

    const [action, setAction] = useState(null);

    useEffect(() => {
        if (me && me.id) {
            alert('로그인 한 사용자는 가입하실수 없습니다.')
            router.push('/')
        }
    }, [me && me.id]);

    // useEffect(() => {
    //     if (action) {
    //       if (signupDone) {
    //         alert('회원가입에 성공하셨습니다.')
    //         router.push('/');
    //       }
    //       if (signupError) {
    //         alert(JSON.stringify(signupError, null, 4));
    //       }
    //       action.setSubmitting(false);
    //       setAction(null);
    //     }
    //   }, [signupDone, signupError]);

    return (
        <Formik
            initialValues={{
                user_nickname: '',
                user_password: '',
                user_password_check: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                dispatch(SignUp({
                    nickname: values.user_nickname,
                    password: values.user_password,
                }));
                setAction({ setSubmitting, resetForm });
            }}>
            <main className="flex justify-center items-center w-full h-screen90 max-w-slg mx-auto">
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
                                        required
                                    />
                                    <input
                                        type="password"
                                        className="form-input py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                        placeholder='비밀번호를 입력해주세요.'
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="form-input py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                        placeholder='비밀번호를 다시 한 번 입력해주세요.'
                                        required
                                    />
                                    <button
                                        // loading={}
                                        type="button"
                                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                        가입하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Formik>
    )
}

export default SignUpAddition