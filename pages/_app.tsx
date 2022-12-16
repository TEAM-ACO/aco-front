import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from '@store/config';
import Header from '@app/header'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="App">
            <Provider store={store}>
                <div className="sticky top-0 z-50">
                    <Header />
                </div>
                <Component {...pageProps} />
            </Provider>
        </div>
    );
}

export default MyApp;