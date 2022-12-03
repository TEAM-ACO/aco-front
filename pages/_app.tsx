import '../styles/globals.css'
import { AppProps } from 'next/app';

const ACO = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
};

export default ACO;