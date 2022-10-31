import React from 'react'
import { User } from '../lib/Types'

interface Props {
  currentUser: User
}

const Welcome = ({ currentUser }: Props) => {
  return (
    <>
      <div className='flex flex-col gap-10 w-full h-full justify-center items-center'>
        <h1 className='text-5xl font-bold'>
          Welcome <span className='text-accent'>{currentUser.username}</span>
        </h1>
        <h3>Select Contact to begin </h3>
      </div>
    </>
  )
}

export default Welcome
