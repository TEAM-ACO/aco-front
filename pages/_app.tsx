import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store, { wrapper } from '@store/config';
import Header from '@app/header'
import { CookiesProvider } from 'react-cookie';
import Head from 'next/head';

function MyApp({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content="Home page" />
                <meta name="keywords" content="Home" />
                <meta property="og:title" content="Project ACO" />
                <title>Project ACO</title>
            </Head>
            <div className="App">
                <Provider store={store}>
                    <CookiesProvider>
                        <div className="sticky top-0 z-50">
                            <Header />
                        </div>
                        <Component {...props.pageProps} />
                    </CookiesProvider>
                </Provider>
            </div>
        </>
    );
}

// wrapper가 HYDRATE액션 처리와, <Provider store={store}>를 알아서 등록해준다.
// wrapper.withRedux
export default MyApp;