import React, { useEffect } from 'react'
import { useCookies } from "react-cookie"
import ForgotPassword from './ForgotPass'
import { useRouter } from 'next/router';

function ForgotPass() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    useEffect(() => {
        if (cookies.user) {
            router.replace('/mainpage')
        }
    })

    return (
        <div>
            <ForgotPassword />
        </div>
    )
}

export default ForgotPass