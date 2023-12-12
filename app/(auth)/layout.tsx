import React, { ReactNode } from 'react'

function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className='bg-slate-200 p-10 rounded-sm'>{children}</div>
    )
}

export default AuthLayout