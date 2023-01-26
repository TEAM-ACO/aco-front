import React from 'react'
import MyPageForm from './MyPage'
import { GetServerSideProps } from 'next'
import wrapper from '@store/config'

const MyPage = () => {
    return (
        <div>
            <MyPageForm />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (req) => {

    return {
        props: {},
    }
})

export default MyPage