import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector, wrapper } from '@store/config';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useCookies } from "react-cookie"

import PostCard from '@app/PostCard';
import { IArticle, userRequestPage } from '@features/postSlice';
import PostForm from '@app/PostForm';
import Mainpage from '@app/mainpage';
import { loadUserPosts, reportMember } from '@actions/post';
import { Avatar, Button, Modal } from 'flowbite-react';
import Head from 'next/head';
import { imgUrl } from 'util/imgUrl';

const userid = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { mainPosts, loadPostsLoading, hasMorePosts, reqPage } = useAppSelector((state) => state.post);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const [ref, inView] = useInView();
    const selectBox = useRef() as React.MutableRefObject<HTMLSelectElement>
    const [requestPage, setRequestPage] = useState<number>(0);
    const [isReported, setIsReported] = useState<Boolean>(false)
    const [userReport, setUserReport] = useState<boolean>(false);
    const [onReportModal, setOnReportModal] = useState<boolean>(false);
    const reportTests: string[] = ["부적절한 콘텐츠입니다", "성적인 콘텐츠입니다.", "진실을 오도하고 있습니다",
        "증오 또는 악의적인 콘텐츠입니다.", "권리를 침해하고 있습니다.", "테러를 조장하고 있습니다.", "폭력적인 콘텐츠입니다."]

    const onReport = useCallback(() => {
        dispatch(reportMember({
            targetUserId: Number(id),
            userReportContext: reportTests[selectBox.current.value as unknown as number],
            reporterUserId: cookies.user.num
        }))
        setIsReported(true)
        setTimeout(() => {
            setOnReportModal(false)
        }, 3000)
    }, [userReport])

    const onUserModalOpen = useCallback(() => {
        setOnReportModal((prev) => !prev)
    }, [onReportModal])

    const onReportModalClose = useCallback(() => {
        setOnReportModal((prev) => !prev)
        setUserReport(false)
    }, [userReport, onReportModal])

    const loadMore = useCallback(() => {
        dispatch(userRequestPage({ reqPage }))
    }, [reqPage])

    useEffect(() => {
        if (!router.isReady) return;
        if (id === undefined) {
            return
        }
        if (inView && hasMorePosts && !loadPostsLoading) {
            loadMore();
            dispatch(loadUserPosts({ memberId: id, requestedPageNumber: reqPage, requestedPageSize: 10 }));
        }
    }, [inView, hasMorePosts, loadPostsLoading, id]);

    return (
        <div>
            <Head>
                <title>{`${mainPosts[0]?.member.nickname}`}님의 페이지입니다. | Project ACO</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="description" content={`${mainPosts[0]?.member.nickname}"님의 페이지입니다." | User Page`} />
                <meta name="keywords" content="User" />
                <meta property="og:title" content="유저페이지 | Project ACO" />
                <meta property="og:image" content="/favicon.png" />
                <meta property="og:description" content={`${mainPosts[0]?.member.nickname}"님의 페이지입니다." | User Page`} />
                <meta property="og:site_name" content="ACO" />
                <meta property="og:locale" content="ko_KR" />
                <link rel="icon" sizes="100x100" href="/favicon.png" />
            </Head>
            <Mainpage>
                <div className="ml-auto mr-auto">
                    <h2 id="accordion-collapse-heading-1" className='px-6'>
                        <div
                            className="flex items-center justify-between w-full p-5 font-medium text-left bg-gray-50 text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400"
                            data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                            <div className='flex items-center gap-2'>
                                <div className='w-10'>
                                    <Avatar
                                        img={`${imgUrl}/image/user/${mainPosts[0]?.member.memberId}`}
                                        rounded={true}
                                    />
                                </div>
                                <span>{mainPosts[0]?.member.nickname}님의 게시글입니다.</span>
                            </div>
                            <button className='hover:text-red-500'
                                onClick={onUserModalOpen}>신고하기</button>
                        </div>
                    </h2>
                    {/* <PostForm /> */}
                    {mainPosts.map((post: IArticle) => {
                        return (
                            <PostCard key={post.articleId} post={post} />
                        )
                    })}
                </div>
                <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 5 }} />
            </Mainpage>
            <div className={userReport ? 'flex' : 'hidden'}>
                <Modal
                    show={onReportModal}
                    size="md"
                    onClose={onReportModalClose}
                >
                    <Modal.Header>
                        유저 신고하기
                    </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="report"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    신고사유
                                </label>
                                <select
                                    ref={selectBox}
                                    id="report"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value={''} disabled>신고사유를 선택해주세요</option>
                                    {reportTests.map((v, i) => <option key={i} value={i}>{v}</option>)}
                                </select>
                            </div>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                허위 신고시 불이익을 받을 수 있습니다.
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onReport} disabled={isReported == true}>
                            신고하기
                        </Button>
                        <Button
                            color="gray"
                            onClick={onReportModalClose}
                        >
                            아니요
                        </Button>
                        {isReported && <span className='text-red-500'>이미 신고한 게시글입니다.<br></br> 잠시후 종료됩니다</span>}
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }: any) => {

    const reqPage = 0
    const payload = await store.dispatch(loadUserPosts({ memberId: params.id, requestedPageNumber: reqPage, requestedPageSize: 10 }))
    // await store.dispatch(userRequestPage({ reqPage: 0 }))
    return {
        props: { message: 'SSR', payload: payload },
    }
})

export default userid