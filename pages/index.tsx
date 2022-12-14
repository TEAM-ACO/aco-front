import React, { useEffect } from 'react';
import { useCookies } from "react-cookie"
import RootLayout from '@app/RootLayout'
import Head from 'next/head'
import Main from './checked'
import { useRouter } from 'next/router';

function Home() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(() => {
        if (cookies.user) {
            router.replace('/mainpage')
        }
    })
    return (
        <>
            <Head>
                {/* <script src="https://developers.kakao.com/sdk/js/kakao.js"></script> */}
                Project ACO
            </Head>
            <RootLayout>
                <div className='h-screen90 flex items-center justify-center text-center'>
                    <Main />
                </div>
            </RootLayout>
        </>
    )
}

export default Home