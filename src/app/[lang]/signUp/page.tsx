import React from 'react'
import Link from 'next/link'

const SignUp = ({ params: { lang } }: LangProps) => {
    return (
        <div>
            SignUp
            <Link href={`/${lang}`}>
                back
            </Link>
        </div>
    )
}

export default SignUp