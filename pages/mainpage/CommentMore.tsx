import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import { IReply } from '@features/postSlice'
import { Button } from 'flowbite-react'

type replyProps = {
    replys: any
    onCommentViewMore: Dispatch<SetStateAction<any>>
}

const CommentMore = ({ replys, onCommentViewMore }: replyProps) => {
    const [allCount, setAllCount] = useState(replys[0]?.totalCount || 0)
    useEffect(() => {
        console.log(replys)
        console.log(allCount)
    })
    return (
        <div className='ml-6 py-2 mt-3'>
            {/* <button onClick={onCommentViewMore} >더보기</button> */}
            {replys.length - allCount < 0 ?
                <Button onClick={onCommentViewMore}>
                    댓글 더 보기
                </Button>
                : <></>
            }
        </div>
    )
}

export default CommentMore