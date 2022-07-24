import React from 'react'
import { Link } from 'react-router-dom'
import {
  Wrapper,
  ErrorText,
} from './RegisterPage.styled'
import { Button, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { toast } from 'react-toastify'
import api from '../../shared/services/api'
import { AxiosError } from 'axios'
import { registerFields } from '../../shared/consts/register-form'

type FormData = {
  name: string
  email: string
  password: string
  repeatPassword: string
}

function RegisterPage() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const submit = async (data: FormData) => {
    try {
      const formData = new FormData()

      if (data.password !== data.repeatPassword) {
        toast.error('Passwords are not the same')
        return
      }

      formData.append('fullName', data.name)
      formData.append('email', data.email)
      formData.append('password', data.password)

      await api.post('/registration', formData)

      reset()

      toast.success('Registered')
    } catch (error: unknown) {
      let message
      if (error instanceof AxiosError) message = error?.response?.data?.error
      else message = String(error)
      toast.error(message)
    }
  }

  return (
    <Wrapper>
      <div className="half">
        <form className="form" onSubmit={handleSubmit(submit)}>
          <h2 className="title">Register</h2>
          {registerFields.map((el) => (
            <label className="form-item">
              <Controller
                name={el.name}
                rules={el.validation}
                defaultValue={el.defaultValue}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextField
                      label={el.helpText}
                      variant="standard"
                      type={el.type}
                      onChange={onChange}
                      value={value}
                      fullWidth={true}
                    />
                    <ErrorMessage
                      errors={errors}
                      name={el.name}
                      render={({ message }: any) => (
                        <ErrorText>{message}</ErrorText>
                      )}
                    />
                  </>
                )}
              />
            </label>
          ))}

          <Button
            fullWidth={true}
            variant="contained"
            type="submit"
            sx={{
              marginTop: '35px',
            }}
          >
            Sign up
          </Button>

          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
      <div className="half view">&nbsp;</div>
    </Wrapper>
  )
}

export default RegisterPage
