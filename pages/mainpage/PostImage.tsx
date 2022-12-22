import React, { useEffect } from 'react'

const PostImage = ({ articleImages }) => {
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