import RootLayout from '@app/RootLayout'
import Head from 'next/head'
import Checked from './checked'

function Home() {
    return (
        <>
            <Head>
                Project ACO
            </Head>
            <RootLayout>
                <div>
                    <Checked />
                </div>
            </RootLayout>
        </>
    )
}

export default Home