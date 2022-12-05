import Link from 'next/link'
import React from 'react'

const header = () => {
    return (
        <div className="p-5 bg-blue-500">
            <div className="flex justify-between">
                <div>
                    <Link href="/" className="font-bold text-white">ACO</Link>
                </div>
                <div>
                    <Link href="/SignUp" className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">Sign-Up</Link>
                    <Link href="/LogIn" className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">Login</Link>
                </div>
            </div>
        </div >
    )
}

export default header