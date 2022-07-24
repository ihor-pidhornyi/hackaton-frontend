import React, { useCallback, useRef, useState } from 'react'
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
import { useGlobalContext } from '../../shared/context/GlobalContext'
import { TreeStatus } from '../../shared/models/tree-status'
import { treeStatusMap } from '../../shared/consts/treeStatusMap'
import API from '../../shared/services/api'

type FormData = {
  radius: string
  typeId: string
  birthDate: string
  state: TreeStatus
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
  const { tasks, treeTypes } = useGlobalContext()

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

  const getDateString = useCallback(
    (date = new Date(), withTime = false): string => {
      const pretify = (value: number): string => {
        return value < 10 ? `0${value}` : value.toString()
      }

      return (
        `${pretify(date.getFullYear())}-${pretify(
          date.getMonth() + 1
        )}-${pretify(date.getDate())}` +
        (withTime
          ? ` ${pretify(date.getHours())}:${pretify(
              date.getMinutes()
            )}:${pretify(date.getSeconds())}`
          : '')
      )
    },
    []
  )

  const submit = async (data: FormData) => {
    try {
      const formData = new FormData()

      console.log(getDateString(new Date(data.birthDate), true))
      formData.append('x', coords.lat.toString())
      formData.append('y', coords.lng.toString())
      formData.append('radius', data.radius)
      formData.append('state', data.state)
      formData.append('type.id', data.typeId)
      formData.append(
        'birthDate',
        getDateString(new Date(data.birthDate), true)
      )
      data.tasks.forEach((taskId, index) => {
        formData.append(`tasks[${index}].id`, taskId.toString())
      })

      const file = getFile()
      file && formData.append('photo', file)

      const res = await API.post('/trees', formData)
      const resData = res.data

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

  const getLabelById = useCallback(
    (id: number): string | null => {
      return tasks.find((task) => task.id === id)?.name ?? null
    },
    [tasks]
  )

  return (
    <Dialog onClose={() => handleClose()} open={open}>
      <Wrapper>
        <div className="half">
          <form className="form" onSubmit={handleSubmit(submit)}>
            <h2 className="title">Додати дерево</h2>
            <label className="form-item">
              <p>Широта: {coords.lat}</p>
            </label>
            <label className="form-item">
              <p>Довгота: {coords.lng}</p>
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
                defaultValue={getDateString()}
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
                defaultValue={TreeStatus.HEALTHY}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    fullWidth={true}
                    value={value}
                    label="Статус"
                    onChange={onChange}
                  >
                    {Object.values<TreeStatus>(TreeStatus).map((el) => (
                      <MenuItem key={el} value={el}>
                        {treeStatusMap[el]}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </label>

            <label className="form-item">
              <Controller
                name={'typeId'}
                defaultValue={treeTypes[0].id + ''}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    fullWidth={true}
                    value={value}
                    label="Тип дерева"
                    onChange={onChange}
                  >
                    {treeTypes.map((type) => (
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
                defaultValue={[]}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    fullWidth={true}
                    multiple
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue)
                    }}
                    options={tasks.map((task) => task.id)}
                    getOptionLabel={(option) => getLabelById(option) ?? ''}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip
                          label={getLabelById(option) ?? ''}
                          {...getTagProps({ index })}
                          key={index}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Завдання" />
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
