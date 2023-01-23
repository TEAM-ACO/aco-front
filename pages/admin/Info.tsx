import React, { useState } from 'react'

type visitorInfoProps = {
    visitorInfo: any;
}

const Info = ({ visitorInfo }: visitorInfoProps) => {
    const [dayOfVisitor, setDayOfVisitor] = useState(Object.keys(visitorInfo.dayOfVisitor));
    console.log(visitorInfo)
    console.log(visitorInfo.dayOfVisitor)
    console.log(visitorInfo.prevLinkWithSum)

    return (
        <>
            <div>{visitorInfo.thisWeekVisitor}</div>
            <div>{dayOfVisitor}</div>
            <div>{Object.keys(visitorInfo.prevLinkWithSum)}</div>
        </>
        // <div>{visitorInfo.thisWeekVisitor}</div>
        // <div>{visitorInfo.thisWeekVisitor}</div>
    )
}

export default Info