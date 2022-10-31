import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../lib/formValidation'
import axios, { AxiosResponse } from 'axios'
import { registerRoute } from '../lib/APIRoutes'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import type { FormInputs } from '../lib/Types'

const Register: NextPage = () => {
  const toastOptions = {
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { username, email, password } = data
      const userData = await axios.post(registerRoute, {
        username,
        email,
        password,
      })
      
      if (userData.data.status === false) {
      
        toast.error(userData.data.msg)
      } else {
        localStorage.setItem('registered-user', JSON.stringify(userData.data))
        router.push('/')
      }
    } catch (err) {
      
    }
  })

  return (
    <div className='flex justify-center items-center w-screen h-screen bg-base-100 '>
      <Toaster />

      <div className='flex flex-col  items-center bg-white rounded-xl shadow-xl min-w-[300px] max-w-[300] md:min-w-[500px] h-fit py-10 '>
        <h1 className=' text-2xl md:text-4xl text-accent font-bold'>Sign up</h1>
        <div className='flex  flex-col gap-8 w-full px-10 py-10 md:px-20 md:py-10 text-black '>
          <div>
            <input
              className={
                errors.username
                  ? 'input w-full input-error bg-slate-200 text-black placeholder:text-slate-500'
                  : ' input w-full  bg-slate-200  text-black placeholder:text-slate-500'
              }
              {...register('username')}
              type='text'
              placeholder='Display Name'
            />
            {errors.username && <p className='text-error text-sm  '>{errors.username.message}</p>}
          </div>
          <div>
            <input
              {...register('email')}
              type='email'
              placeholder='Email'
              className={
                errors.email
                  ? 'input w-full input-error bg-slate-200  text-black placeholder:text-slate-500'
                  : ' input w-full  bg-slate-200  text-black placeholder:text-slate-500'
              }
            />
            {errors.email && <p className='text-error text-sm '>{errors.email.message}</p>}
          </div>
          <div>
            <input
              className={
                errors.password
                  ? 'input w-full input-error bg-slate-200  text-black placeholder:text-slate-500'
                  : ' input w-full  bg-slate-200  text-black placeholder:text-slate-500'
              }
              {...register('password')}
              type='password'
              placeholder='Password'
            />
            {errors.password && <p className='text-error text-sm '>{errors.password.message}</p>}
          </div>
          <div>
            <input
              className={
                errors.confirmPassword
                  ? 'input w-full input-error bg-slate-200  text-black placeholder:text-slate-500'
                  : ' input w-full  bg-slate-200  text-black placeholder:text-slate-500'
              }
              {...register('confirmPassword')}
              type='password'
              placeholder='Confirm Password'
            />
            {errors.confirmPassword && <p className='text-error text-sm  '>{errors.confirmPassword.message}</p>}
          </div>
        </div>
        <button onClick={onSubmit} className='btn btn-accent border-2 rounded-2xl px-20'>
          Register
        </button>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='mt-5 text-black'>ALREADY HAVE AN ACCOUNT? </h3>
          <Link href={'/login'} className='text-accent cursor-pointer'>
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
