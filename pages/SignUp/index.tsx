import React, { useEffect } from 'react'
import { useCookies } from "react-cookie"
import SignUpForm from './SignUpForm'
import { useRouter } from 'next/router';

function SignUp() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(() => {
        if (cookies.user) {
            router.replace('/mainpage')
        }
    })

    return (
        <div>
            <SignUpForm />
        </div>
    )
}

export default SignUp