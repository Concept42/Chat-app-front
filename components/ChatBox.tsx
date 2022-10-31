import React, { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react'
import { Contact, User } from '../lib/Types'
import Image from 'next/image'
import { MdOutlineClose } from 'react-icons/Md'
import ChatInput from './ChatInput'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../lib/APIRoutes'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  currentChat: Contact
  currentUser: User
  socket: any
  currentSelected: number | null
  setCurrentSelected: Dispatch<SetStateAction<number | null>>
}

interface Message {
  fromSelf: boolean
  message: string
}

const ChatBox = ({ currentChat, currentUser, socket, setCurrentSelected }: Props) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [incMessage, setIncMessage] = useState<Message>({ fromSelf: false, message: '' })

  const scrollRef = useRef<null | HTMLDivElement>(null)

  const handleSendMsg = async (msg: string) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    })
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    })
    const msgs: Message[] = [...messages]
    msgs.push({ fromSelf: true, message: msg })
    setMessages(msgs)
  }

  useEffect(() => {
    if (currentUser) {
      socket.current.on('msg-recieve', (msg: string) => {
        setIncMessage({ fromSelf: false, message: msg })
      })
    }
  }, [currentUser, socket])

  useEffect(() => {
    incMessage && setMessages((prev) => [...prev, incMessage])
  }, [incMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const getChatMessesages = async () => {
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser?._id,
        to: currentChat?._id,
      })

      setMessages(response.data)
    }
    if (currentChat) {
      getChatMessesages()
    }
  }, [currentChat, currentUser._id])

  return (
    <div className='flex flex-col relative overflow-y-scroll'>
      <div className=' flex justify-between items-center bg-base-300 absolute top-0 w-full h-20 '>
        <div className='flex gap-5 justify-center items-center'>
          <div className='ml-5 w-10 h-10 relative '>
            <Image alt='avatar' src={currentChat.avatarImage} width={40} height={40} />
          </div>
          <h3 className='text-2xl text-accent'>{currentChat?.username}</h3>
        </div>
      </div>
      <div className='flex flex-col gap-5 overflow-y-scroll w-full h-full py-10'>
        {messages.map((message) => {
          return (
            <div className='flex w-full h-full ' key={uuidv4()}>
              <div
                className={`flex items-center px-5  w-full h-full text-white ${
                  message.fromSelf ? 'justify-end ' : 'justify-start w-[40%] '
                }`}
              >
                <div
                  className={`px-4 py-2 max-w-[70%] rounded-3xl break-words ${
                    message.fromSelf ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                  ref={scrollRef}
                >
                  {message?.message}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  )
}

export default ChatBox
