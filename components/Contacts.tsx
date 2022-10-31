import React, { Dispatch, SetStateAction, useState } from 'react'
import type { Contact, User } from '../lib/Types'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Props {
  contacts: Contact[]
  currentUser: User
  changeChat: (chat: Contact) => void
  currentSelected: number | null
  setCurrentSelected: Dispatch<SetStateAction<number | null>>
}

const Contacts = ({ contacts, currentUser, changeChat, currentSelected, setCurrentSelected }: Props) => {
  const router = useRouter()

  const logOut = () => {
    localStorage.clear()
    router.push('/login')
  }

  const changeCurrentChat = (index: number, contact: Contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  }

  return (
    <div className='w-full h-full flex flex-col gap-5  items-center border-r-2 border-zinc-900 bg-slate-800 py-5 overflow-y-scroll'>
      <h1 className='text-3xl'>CONTACTS</h1>
      <div className='overflow-y-scroll w-full h-full'>
        <ul className='flex flex-col gap-5 w-full px-5 '>
          {contacts.map((contact: Contact, index: number) => {
            return (
              <li
                onClick={() => changeCurrentChat(index, contact)}
                className={
                  currentSelected === index
                    ? 'flex gap-10 justify-start items-center w-full h-20 bg-primary rounded-xl '
                    : 'flex gap-10 justify-start items-center w-full h-20 bg-accent rounded-xl'
                }
                key={index}
              >
                <div className='ml-5 w-10 h-10 relative '>
                  <Image src={contact.avatarImage} alt='avatar' width={80} height={80} />
                </div>
                <h2 className='text-2xl text-white font-bold'>{contact.username}</h2>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='flex w-full h-32 justify-center items-center bg-slate-700 gap-10'>
        <div className='ml-5 w-20 h-20 relative '>
          {currentUser.avatarImage ? <Image alt='avatar' src={currentUser.avatarImage} width={80} height={80} /> : null}
        </div>
        <h3 className='text-3xl text-accent'>{currentUser.username}</h3>
        <button
          className='text-white border-2 px-4 py-2 rounded-3xl cursor-pointer border-accent hover:bg-accent'
          onClick={logOut}
        >
          LogOut
        </button>
      </div>
    </div>
  )
}

export default Contacts
