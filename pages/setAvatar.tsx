import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { NextPage } from 'next'
import { setAvatarRoute } from '../lib/APIRoutes'
import { useRouter } from 'next/router'
import { randomImages } from '../lib/Data'

const SetAvatar: NextPage = () => {
  const [randomAvatars, setRandomAvatars] = useState<string[]>([])
  const [selectedAvatar, setSelectedAvatar] = useState<number>(0)

  const router = useRouter()

  const showRandomAvatar = () => {
    const randomAvatarImages: string[] = []
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.round(Math.random() * 14 + 1)

      randomAvatarImages.push(randomImages.slice(randomIndex - 1, randomIndex).toString())
    }
    setRandomAvatars(randomAvatarImages)
  }

  useEffect(() => {
    const localUser = localStorage.getItem('logged-user')
    if (!localUser) {
      router.push('/login')
    }
    if (typeof localUser === 'string') {
      const parse = JSON.parse(localUser)
      if (parse.isAvatarImageSet === true) {
        router.push('/')
      }
    }
  }, [router])

  useEffect(() => {
    showRandomAvatar()
  }, [])

  const setAvatar = async () => {
    const localUser = localStorage.getItem('logged-user')
    if (typeof localUser === 'string') {
      const parse = JSON.parse(localUser)
      const { data } = await axios.post(`${setAvatarRoute}/${parse._id}`, {
        image: randomAvatars[selectedAvatar],
      })
      if (data.isSet) {
        parse.isAvatarImageSet = true
        parse.avatarImage = data.image
        localStorage.setItem('logged-user', JSON.stringify(parse))
        router.push('/')
      }
    }
  }

  return (
    <div className='flex flex-col gap-10 w-screen h-screen justify-center items-center bg-base-100'>
      <h1 className='text-4xl text-black font-bold'>Pick your avatar</h1>
      <button onClick={showRandomAvatar}>Random</button>
      <ul className='flex gap-10 '>
        {randomAvatars?.map((avatar, index) => {
          return (
            <li
              className={
                selectedAvatar === index
                  ? 'flex justify-center items-center w-[200px] h-[200px] border-[5px] border-red-800 relative '
                  : 'flex justify-center items-center w-[200px] h-[200px] border-2 border-gray-800 relative '
              }
              key={index}
            >
              {
                <Image
                  onClick={() => {
                    setSelectedAvatar(index)
                   
                  }}
                  src={avatar}
                  fill
                  alt='avatar'
                />
              }
            </li>
          )
        })}
      </ul>
      <button
        onClick={setAvatar}
        className='flex px-10 py-3 border-2 rounded-xl text-black transition-all duration-300 hover:bg-white'
      >
        Set Avatar
      </button>
    </div>
  )
}

export default SetAvatar
