import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

import { AxiosError } from "axios";

type FormData = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  password: string;
  repeatPassword: string;
};

export interface ICreateTreeForm {
  open: boolean;
  onClose: (value: string) => void;
}

const MAX_FILE_SIZE = 1024 * 1024 * 5;

function CreateTreeForm({open, onClose}: ICreateTreeForm) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const inputEl = useRef<HTMLInputElement | null>(null);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const getInput = (): HTMLInputElement | null => {
    return inputEl.current instanceof HTMLInputElement ? inputEl.current : null;
  };

  const getFile = (): File | null => {
    const input = getInput();

    return input ? input.files?.[0] ?? null : null;
  };

  const onFileChange = () => {
    const input = getInput();
    const file = getFile();

    if (file?.size && file?.size > MAX_FILE_SIZE && input) {
      toast.error("Too large image. Max size is 5mb");
      input.value = "";
    } else {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageUrl(typeof reader.result === "string" ? reader.result : null);
      };

      file && reader.readAsDataURL(file);
    }
  };

  const removeImage = (event: unknown): void => {
    (event as MouseEvent)?.preventDefault();
    const input = getInput();
    if (input) input.value = "";
    setImageUrl(null);
  };

  const submit = async (data: FormData) => {
    try {
      const formData = new FormData();

      if (data.password !== data.repeatPassword) {
        toast.error("Passwords are not the same");
        return;
      }

      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("birthDate", data.birthDate);

      const file = getFile();
      file && formData.append("photo", file);

      reset();
      const input = getInput();
      if (input) input.value = "";
      setImageUrl(null);

      toast.success("Registered");
    } catch (error: unknown) {
      let message;
      if (error instanceof AxiosError) message = error?.response?.data?.error;
      else message = String(error);
      toast.error(message);
    }
  };

  const handleClose = () => {
    onClose('');
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create tree</DialogTitle>
    </Dialog>

    // <Wrapper>
    //   <div className="half">
    //     <form className="form" onSubmit={handleSubmit(submit)}>
    //       <h2 className="title">Register</h2>
    //       {registerFields.map((el) => (
    //         <label key={el.name} className="form-item">
    //           <Controller
    //             name={el.name}
    //             rules={el.validation}
    //             defaultValue={el.defaultValue}
    //             control={control}
    //             render={({ field: { onChange, value } }) => (
    //               <>
    //                 <TextField
    //                   label={el.helpText}
    //                   variant="standard"
    //                   type={el.type}
    //                   onChange={onChange}
    //                   value={value}
    //                   fullWidth={true}
    //                 />
    //                 <ErrorMessage
    //                   errors={errors}
    //                   name={el.name}
    //                   render={({ message }: any) => (
    //                     <ErrorText>{message}</ErrorText>
    //                   )}
    //                 />
    //               </>
    //             )}
    //           />
    //         </label>
    //       ))}

    //       <label className="form-item">
    //         <Controller
    //           name={'birthDate'}
    //           defaultValue={'2003-05-24'}
    //           control={control}
    //           render={({ field: { onChange, value } }) => (
    //             <TextField
    //               label="Birth date"
    //               variant="standard"
    //               type="date"
    //               onChange={onChange}
    //               value={value}
    //               fullWidth={true}
    //             />
    //           )}
    //         />
    //       </label>
    //       <label className="form-item">
    //         <div className="file-label">Upload a photo (Optional):</div>
    //         <div className="file-content">
    //           <div className="preview">
    //             <img src={imageUrl ? imageUrl : 'img/user-empty.jpg'} />
    //           </div>
    //           <div className="upload-file-wrapper">
    //             <PictureIcon />
    //             <input
    //               ref={inputEl}
    //               onChange={onFileChange}
    //               className="input-file"
    //               type="file"
    //               accept="image/*,capture=camera"
    //             />
    //           </div>
    //         </div>
    //         {imageUrl ? (
    //           <div className="image-path">
    //             <div className="image-name">
    //               {getInput()?.value?.replace(/^.*\\/, '') ?? ''}
    //             </div>
    //             <div onClick={removeImage}>
    //               <RemoveIcon />
    //             </div>
    //           </div>
    //         ) : null}
    //       </label>

    //       <Button
    //         fullWidth={true}
    //         variant="contained"
    //         type="submit"
    //         sx={{
    //           marginTop: '35px',
    //         }}
    //       >
    //         Sign up
    //       </Button>

    //       <p>
    //         Already have an account? <Link to="/login">Sign in</Link>
    //       </p>
    //     </form>
    //   </div>
    //   <div className="half view">&nbsp;</div>
    // </Wrapper>
  );
}

export default CreateTreeForm;
