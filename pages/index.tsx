import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { allUsersRoute, host } from '../lib/APIRoutes'
import type { Contact, User } from '../lib/Types'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatBox from '../components/ChatBox'
import { io } from 'socket.io-client'

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [currentUser, setCurrentUser] = useState<User>({
    _id: '',
    username: '',
    password: '',
    email: '',
    isAvatarImageSet: false,
    avatarImage: '',
  })
  const [currentChat, setCurrentChat] = useState<Contact>()
  const [currentSelected, setCurrentSelected] = useState<number | null>(null)

  const router = useRouter()
  const socket = useRef<any>()
  console.log(currentUser)
  useEffect(() => {
    const localUser = localStorage.getItem('logged-user')
    const setLoggedUser = async () => {
      if (typeof localUser === 'string') {
        const parse = await JSON.parse(localUser)
        setCurrentUser(parse)
        if (parse.isAvatarImageSet === false) {
          router.push('/setAvatar')
        }
      }
    }
    if (localUser) {
      setLoggedUser()
    } else {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host)
      socket.current.emit('add-user', currentUser._id)
    }
  })
  useEffect(() => {
    const getAllUsers = async () => {
      const data = await axios.get(`${allUsersRoute}/${currentUser?._id}`)
      setContacts(data.data)
    }
    if (currentUser?.isAvatarImageSet) {
      getAllUsers()
    }
  }, [currentUser, router])

  const handleChatChage = (chat: Contact) => {
    setCurrentChat(chat)
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center mx-auto'>
      <div className='container h-[85vh] bg-neutral grid grid-cols-[25%,75%] md:grid-cols-[35%,65%] '>
        <Contacts
          currentSelected={currentSelected}
          setCurrentSelected={setCurrentSelected}
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChage}
        />
        {!currentChat ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatBox
            currentSelected={currentSelected}
            setCurrentSelected={setCurrentSelected}
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  )
}
