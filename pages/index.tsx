import RootLayout from '@app/RootLayout'
import Head from 'next/head'
import FirstMain from './checked'

function Home() {
    return (
        <>
            <Head>
                Project ACO
            </Head>
            <RootLayout>
                <div>
                    <FirstMain />
                </div>
            </RootLayout>
        </>
    )
}

export default Home