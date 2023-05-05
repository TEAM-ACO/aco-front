import React, { useEffect } from 'react';
import { useCookies } from "react-cookie"
import RootLayout from '@components/RootLayout'
import Head from 'next/head'
import Main from '../components/main'
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
            <RootLayout>
                <Head>
                    <link rel="icon" sizes="100x100" href="/favicon.png" />
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                    />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <meta name="description" content="ACO Home page입니다." />
                    <meta name="keywords" content="Home" />
                    <meta property="og:image" content="/favicon.png" />
                    <meta property="og:title" content="Project ACO" />
                    <meta property="og:description" content="ACO Home page입니다." />
                    <meta property="og:site_name" content="ACO" />
                    <meta property="og:locale" content="ko_KR" />
                    <title>Project ACO</title>
                </Head>
                <div className='h-screen90 flex items-center justify-center text-center'>
                    <Main />
                </div>
            </RootLayout>
        </>
    )
}

export default Home