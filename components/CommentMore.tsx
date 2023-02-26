import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import { Button } from 'flowbite-react'
import { IReply } from '@features/postSlice'

type replyProps = {
    replys: IReply[]
    onCommentViewMore: Dispatch<SetStateAction<any>>
}

const CommentMore = ({ replys, onCommentViewMore }: replyProps) => {
    const [allCount, setAllCount] = useState<number>(0)
    const [moreReplyBoolean, setMoreReplyBoolean] = useState<boolean>(false)

    useEffect(() => {
        setAllCount(replys[0]?.totalCount || 0)
        if (replys.length === 5) {
            setMoreReplyBoolean(true)
        } else {
            setMoreReplyBoolean(false)
        }
    }, [moreReplyBoolean, replys])

    return (
        <div className='ml-6 py-2 mt-3'>
            {moreReplyBoolean ?
                <Button onClick={onCommentViewMore}>
                    댓글 더 보기
                </Button>
                : <></>
            }
        </div>
    )
}

export default CommentMore