import React, { useRef, useState } from 'react'
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import {
  ErrorText,
  PictureIcon,
  RemoveIcon,
  Wrapper,
} from './CreateTreeForm.styled'
import { createTreeFormFields } from '../../shared/consts/create-tree-form-fields'
import { Coordinates } from '../../shared/models/coordinates'

enum States {
  healthy = 'HEALTHY',
  ill = 'ILL',
  bad = 'BAD',
}

const types = [
  {
    id: '1',
    name: 'Клен',
  },
  {
    id: '2',
    name: 'Дуб',
  },
  {
    id: '3',
    name: 'Верба',
  },
]

const tasks1 = [432, 4123, 423423, 423, 342, 324]

type Type = {
  description: string
  name: string
}

type Task = {
  id: number
  name: string
}

type FormData = {
  radius: string
  typeId: string
  birthDate: string
  state: States
  tasks: number[]
}

export interface ICreateTreeForm {
  open: boolean
  onClose: (value: string) => void
  coords: Coordinates
}

const MAX_FILE_SIZE = 1024 * 1024 * 5

function CreateTreeForm({ open, onClose, coords }: ICreateTreeForm) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const inputEl = useRef<HTMLInputElement | null>(null)
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const getInput = (): HTMLInputElement | null => {
    return inputEl.current instanceof HTMLInputElement ? inputEl.current : null
  }

  const getFile = (): File | null => {
    const input = getInput()

    return input ? input.files?.[0] ?? null : null
  }

  const onFileChange = () => {
    const input = getInput()
    const file = getFile()

    if (file?.size && file?.size > MAX_FILE_SIZE && input) {
      toast.error('Too large image. Max size is 5mb')
      input.value = ''
    } else {
      const reader = new FileReader()

      reader.onloadend = () => {
        setImageUrl(typeof reader.result === 'string' ? reader.result : null)
      }

      file && reader.readAsDataURL(file)
    }
  }

  const removeImage = (event: unknown): void => {
    ;(event as MouseEvent)?.preventDefault()
    const input = getInput()
    if (input) input.value = ''
    setImageUrl(null)
  }

  const submit = async (data: FormData) => {
    try {
      const formData = new FormData()

      formData.append('lat', coords.lat.toString())
      formData.append('lng', coords.lng.toString())
      formData.append('radius', data.radius)
      formData.append('state', data.state)
      formData.append('typeId', data.typeId)
      formData.append('birthDate', data.birthDate)

      const file = getFile()
      file && formData.append('photo', file)

      reset()
      const input = getInput()
      if (input) input.value = ''
      setImageUrl(null)

      toast.success('Created Tree')
    } catch (error: unknown) {
      let message
      if (error instanceof AxiosError) message = error?.response?.data?.error
      else message = String(error)
      toast.error(message)
    }
  }

  const handleClose = () => {
    onClose('')
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Wrapper>
        <div className="half">
          <form className="form" onSubmit={handleSubmit(submit)}>
            <h2 className="title">Add tree</h2>
            <label className="form-item">
              <p>Lattitude: {coords.lat}</p>
            </label>
            <label className="form-item">
              <p>Longtitude: {coords.lng}</p>
            </label>
            {createTreeFormFields.map((el) => (
              <label key={el.name} className="form-item">
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

            <label className="form-item">
              <Controller
                name={'birthDate'}
                defaultValue={'2003-05-24'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Дата народження"
                    variant="standard"
                    type="date"
                    onChange={onChange}
                    value={value}
                    fullWidth={true}
                  />
                )}
              />
            </label>

            <label className="form-item">
              <Controller
                name={'state'}
                defaultValue={States.bad}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    fullWidth={true}
                    value={value}
                    label="Статус"
                    onChange={onChange}
                  >
                    {Object.values(States).map((el) => (
                      <MenuItem key={el} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </label>

            <label className="form-item">
              <Controller
                name={'typeId'}
                defaultValue={types[0].id}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    fullWidth={true}
                    value={value}
                    label="Тип дерева"
                    onChange={onChange}
                  >
                    {types.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </label>

            <label className="form-item">
              <Controller
                name={'tasks'}
                defaultValue={[tasks1[0]]}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    fullWidth={true}
                    multiple
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue)
                    }}
                    options={tasks1}
                    getOptionLabel={(option) => option.toString()}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          key={index}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Завдання"
                      />
                    )}
                  />
                )}
              />
            </label>

            <label className="form-item">
              <div className="file-label">Додати фото (Опціонально):</div>
              <div className="file-content">
                <div className="preview">
                  <img
                    src={imageUrl ? imageUrl : 'img/image-placeholder.jpg'}
                    alt="tree"
                  />
                </div>
                <div className="upload-file-wrapper">
                  <PictureIcon />
                  <input
                    ref={inputEl}
                    onChange={onFileChange}
                    className="input-file"
                    type="file"
                    accept="image/*,capture=camera"
                  />
                </div>
              </div>
              {imageUrl ? (
                <div className="image-path">
                  <div className="image-name">
                    {getInput()?.value?.replace(/^.*\\/, '') ?? ''}
                  </div>
                  <div onClick={removeImage}>
                    <RemoveIcon />
                  </div>
                </div>
              ) : null}
            </label>

            <Button
              fullWidth={true}
              variant="contained"
              type="submit"
              sx={{
                marginTop: '35px',
              }}
            >
              Додати
            </Button>
          </form>
        </div>
      </Wrapper>
    </Dialog>
  )
}

export default CreateTreeForm
