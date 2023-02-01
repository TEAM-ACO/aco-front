import React from 'react'
import Link from 'next/link'

type Tags = {
    tags: string
}

const PostCardContent = ({ tags }: Tags) => {
    return (
        <>
            <Link
                href={`/search/${tags}`}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {tags}</Link>
        </>
    )
}

export default PostCardContent;