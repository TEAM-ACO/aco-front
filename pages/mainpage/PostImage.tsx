import React, { useEffect } from 'react'

type Images = {
    articleImages: string
}

const PostImage = ({ articleImages }: Images) => {
    return (
        <div className='flex justify-center'>
            <img
                className='object-contain h-56 sm:h-64 xl:h-80 2xl:h-96'
                src={articleImages}
                alt={articleImages}
            />
        </div>
    )
}

export default PostImage