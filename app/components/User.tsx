'use client'

import { useUser, UserButton, SignInButton } from '@clerk/nextjs'

const User = () => {
  const { isSignedIn, user } = useUser()

  return (
    <div className="flex items-center gap-4">
      {isSignedIn ? (
        <>
          <span className="hidden md:inline">{user?.firstName}</span>
          <div className="flex items-center gap-2">
            
            
            {/* User Button with Dropdown */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </>
      ) : (
        <div className="flex gap-2">
          <SignInButton mode="modal">
            <button className="px-3 py-1 rounded bg-light text-primary hover:text-light hover:bg-primary">
              Sign In
            </button>
          </SignInButton>
        </div>
      )}
    </div>
  )
}

export default User