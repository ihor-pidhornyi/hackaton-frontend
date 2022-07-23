import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Wrapper } from './LoginPage.styled'
import { Button, TextField } from '@mui/material'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import API from '../../shared/services/api'
import { useGlobalContext } from '../../shared/context/GlobalContext'
import { AxiosError } from '../../shared/models/axios-error'

type FormData = {
  email: string
  password: string
}

function LoginPage() {
  const [queryParams] = useSearchParams()

  useEffect(() => {
    const emailConfirm = queryParams.get('emailConfirm')

    if (emailConfirm) {
      toast.success('Email confirmed!')
    }
  }, [queryParams])

  const { setToken } = useGlobalContext()
  const navigate = useNavigate()
  const { reset, control, handleSubmit } = useForm<FormData>()

  const submit = async (data: FormData) => {
    try {
      const formData = new FormData()

      formData.append('username', data.email)
      formData.append('password', data.password)

      const result = await API.post('login', formData)
      const token = result.data?.token as string

      localStorage.setItem('token', JSON.stringify(token))
      setToken(token)

      navigate('/users')
      reset()
      toast.success('Logged')
    } catch (e: unknown) {
      const error = e as AxiosError
      toast.error(error.response.data.error)
    }
  }
  return (
    <Wrapper>
      <div className="half">
        <form className="form" onSubmit={handleSubmit(submit)}>
          <h2 className="title">Login</h2>
          <label className="form-item">
            <Controller
              name={'email'}
              defaultValue={''}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Email"
                  variant="standard"
                  type="email"
                  onChange={onChange}
                  value={value}
                  fullWidth={true}
                />
              )}
            />
          </label>
          <label className="form-item">
            <Controller
              name={'password'}
              defaultValue={''}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Password"
                  variant="standard"
                  type="password"
                  onChange={onChange}
                  value={value}
                  fullWidth={true}
                />
              )}
            />
          </label>

          <Button
            type="submit"
            variant="contained"
            fullWidth={true}
            sx={{
              marginTop: '35px',
            }}
          >
            Sign in
          </Button>

          <p>
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </form>
      </div>
      <div className="half view"></div>
    </Wrapper>
  )
}

export default LoginPage
