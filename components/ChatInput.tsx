import React, { SyntheticEvent, useState } from 'react'
import { EmojiClickData } from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
import dynamic from 'next/dynamic'
import { Theme } from 'emoji-picker-react'

const Picker = dynamic(
  () => {
    return import('emoji-picker-react')
  },
  { ssr: false },
)

interface Props {
  handleSendMsg: (msg: string) => void
}

const ChatInput = ({ handleSendMsg }: Props) => {
  const [showEmoji, setShowEmoji] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>('')

  const handleEmojiClick = (emoji: EmojiClickData) => {
    let message = msg
    message += emoji.emoji
    setMsg(message)
    
  }
  const sendMsg = (event: SyntheticEvent) => {
    event.preventDefault()
    if (msg.length > 0) {
      handleSendMsg(msg)
      setMsg('')
    }
  }

  return (
    <div className='flex w-full h-20 bg-base-300 justify-around items-center px-10 gap-5 '>
      <div className='cursor-pointer' onClick={() => setShowEmoji(!showEmoji)}>
        <BsEmojiSmileFill size={40} />
        {showEmoji ? (
          <div className='absolute bottom-[100px]  '>
            <Picker theme={Theme.DARK} onEmojiClick={handleEmojiClick} />
          </div>
        ) : null}
      </div>

      <form onSubmit={(e) => sendMsg(e)} className='flex w-full relative items-center'>
        <input
          className='w-full h-10 border-none focus:ring-0 rounded-3xl bg-slate-500 text-black px-10 '
          type='text'
          placeholder='Type a message...'
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value)
          }}
        />
        <button type='submit' className='absolute text-white right-0'>
          <div className=' flex bg-accent h-10 px-8 border-2 border-transparent rounded-3xl items-center'>
            <IoMdSend size={25} />
          </div>
        </button>
      </form>
    </div>
  )
}

export default ChatInput
