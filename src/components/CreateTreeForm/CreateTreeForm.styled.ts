import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { IoMdCloudUpload } from "react-icons/io";
import { AiFillCloseCircle } from "react-icons/ai";

export const Wrapper = styled.div(
    css({
      display: 'flex',
      alignItems: 'center',
  
      '.half': {
        flex: '1 0 50%',
      },
  
      '.form': {
        padding: '50px',
        maxWidth: '400px',
        margin: '0 auto',
      },
  
      '.view': {
        height: 'calc(100vh - 56px)',
        backgroundImage: `url(img/tree.jpg)`,
        backgroundPosition: 'center center',
      },
  
      '.title, p': {
        textAlign: 'center',
      },
  
      '.form-item': {
        display: 'block',
        marginBottom: '10px',
      },
  
      '.upload-file-wrapper': {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        border: '2px dashed #ccebff',
        borderRadius: '6px',
        padding: '2.5rem 2rem',
        boxSizing: 'border-box',
        cursor: 'pointer',
      },
  
      '.input-file': {
        display: 'none',
      },
  
      '.file-label': {
        marginBottom: '.5rem',
        color: '#666666',
      },
  
      '.preview': {
        '& > img': {
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          objectFit: 'cover',
        },
      },
  
      '.file-content': {
        marginTop: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '0 15px',
      },
  
      '.image-name': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
  
      '.image-path': {
        marginTop: '.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0 10px',
        '& svg': {
          width: '25px',
        },
      },
  
      '@media screen and (max-width: 900px)': {
        '.view': {
          display: 'none',
        },
      },
    })
  )

export const PictureIcon = styled(IoMdCloudUpload)(
  css({
    width: "30px",
    height: "30px",
    color: "#80ccff",
  })
);

export const RemoveIcon = styled(AiFillCloseCircle)(
  css({
    width: "25px",
    height: "25px",
    cursor: "pointer",
  })
);

export const ErrorText = styled.p(
    css({
      color: 'red',
      fontSize: '0.5rem',
    })
  )
