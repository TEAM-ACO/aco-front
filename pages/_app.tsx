import '../styles/globals.css'
import { AppProps } from 'next/app';

import wrapper from "../store/config";
import Head from 'next/head';

const ACO = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>Project ACO</Head>
            <Component {...pageProps} />
        </>
    );
};

export default wrapper.withRedux(ACO);