import React, { useEffect } from 'react'
import AdminMenu from '../../components/AdminMenu'
import Select, { ActionMeta, SingleValue } from 'react-select';
import Head from 'next/head'
import { useRouter } from 'next/router'


const Visitant = () => {
    const router = useRouter();

    useEffect(() => {
        // admin에 접근방지
        router.replace('/admin/member/1')
    }, [])


    return (
        <>
            <Head>
                <title>관리자페이지 | Project ACO</title>
                <link rel="icon" sizes="100x100" href="/favicon.png" />
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="Admin page" />
                <meta name="keywords" content="Admin" />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:title" content="관리자페이지 | Project ACO" />
                <meta property="og:description" content="Admin page" />
                <meta property="og:site_name" content="ACO" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <AdminMenu>

            </AdminMenu>
        </>
    )
}

export default Visitant