import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store, { wrapper } from '@store/config';
import Header from '@app/header'
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps, ...rest }: AppProps) {
    // const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <div className="App">
            <CookiesProvider>
                {/* <Provider store={store}> */}
                <div className="sticky top-0 z-50">
                    <Header />
                </div>
                <Component {...pageProps} />
                {/* </Provider> */}
            </CookiesProvider>
        </div>
    );
}

// wrapper가 HYDRATE액션 처리와, <Provider store={store}>를 알아서 등록해준다.
export default wrapper.withRedux(MyApp);