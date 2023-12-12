import React, { ReactNode } from 'react'
import { Button } from './ui/button'

function GoogleSignInButton({ children }: { children: ReactNode }) {

    const LoginWithGoogle = () => {
        console.log("Logging in with Google...")
    }

    return (
        <Button className='w-full' onClick={LoginWithGoogle}>{children}</Button>
    )
}

export default GoogleSignInButton