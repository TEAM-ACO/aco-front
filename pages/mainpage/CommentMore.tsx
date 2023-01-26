import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import { Button } from 'flowbite-react'

type replyProps = {
    replys: any
    onCommentViewMore: Dispatch<SetStateAction<any>>
}

const CommentMore = ({ replys, onCommentViewMore }: replyProps) => {
    const [allCount, setAllCount] = useState<number>()

    useEffect(() => {
        setAllCount(replys[0]?.totalCount || 0)
    }, [])

    return (
        <div className='ml-6 py-2 mt-3'>
            {replys.length - (allCount as number) < 0 ?
                <Button onClick={onCommentViewMore}>
                    댓글 더 보기
                </Button>
                : <></>
            }
        </div>
    )
}

export default CommentMore