import React from 'react'
import { imgUrl } from 'util/imgUrl'

type Images = {
    articleImages: string
}

const PostImage = ({ articleImages }: Images) => {
    return (
        <div className='flex justify-center'>
            <img
                className='object-contain h-56 sm:h-64 xl:h-72'
                src={`${imgUrl}/image/images/${articleImages}`}
                alt={articleImages}
                loading="lazy"
            />
        </div>
    )
}

export default PostImage