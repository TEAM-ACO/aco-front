import React, { Dispatch, SetStateAction, useState, useCallback } from 'react'

type Props = {
    limit: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ limit, page, setPage }: Props) => {
    const [currPage, setCurrPage] = useState<number>(page)
    const numPages = [];
    for (let i = 1; i <= Math.ceil(45 / limit); i++) {
        numPages.push(i);
    }

    const onPrevButton = useCallback(() => {
        setPage(page - 1);
        setCurrPage(page - 2);
        console.log(currPage)
    }, [currPage])

    const onNextButton = useCallback(() => {
        setPage(page + 1);
        setCurrPage(page);
        console.log(currPage)
    }, [currPage])

    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <button
                        className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={onPrevButton}
                        disabled={page === 1}>
                        <span className="sr-only">Previous</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </li>
                {numPages.map((number, i) => {
                    return (
                        <li>
                            <button
                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                key={number}
                                onClick={() => { setPage(number); console.log(number) }}
                            >
                                {number}
                            </button>
                        </li>
                    )
                })}
                {/* <li>
                    <a href="#" 
                    aria-current="page"
                     className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                </li> */}
                <li>
                    <button
                        onClick={onNextButton}
                        disabled={page === numPages.length}
                        className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>

    )
}

export default Pagination