import React, { useCallback } from 'react'
import Link from 'next/link'
import { searchRequestPage } from '@features/postSlice'
import { useAppDispatch, useAppSelector } from '@store/config'

type Tags = {
    tags: string
}

const PostCardContent = ({ tags }: Tags) => {
    const dispatch = useAppDispatch();
    const onTagSearch = useCallback(() => {
        dispatch(searchRequestPage({ searchValue: 0 }))
    }, [])
    
    return (
        <>
            <Link
                href={`/search/${tags}`}
                onClick={onTagSearch}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {tags}</Link>
        </>
    )
}

export default PostCardContent;