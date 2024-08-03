import React, { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

const Container = styled('div')(({ theme }) => ({
  width: '16rem',
  height: '24rem',
  padding: '1rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
}));

const AvatarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1rem',
  flexGrow: 1,
});

const CustomAvatar = styled(Avatar)({
  width: '6rem',
  height: '6rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0',
});

const InputHidden = styled('input')({
  display: 'none',
});

const CustomButton = styled(Button)({
  marginTop: 'auto',
  backgroundColor: '#3b82f6',
  color: 'white',
  '&:hover': {
    backgroundColor: '#2563eb',
  },
});

const MoreT = ({ title: initialTitle, description: initialDescription, image: initialImage, onSave }) => {
  const [title, setTitle] = useState(initialTitle || '');
  const [description, setDescription] = useState(initialDescription || '');
  const [image, setImage] = useState(initialImage || 'https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png');
  const inputRef = useRef(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ title, description, src: image });
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <h1 className="text-lg font-semibold mb-2">Profile Picture</h1>
        <AvatarContainer onClick={handleImageClick}>
          <CustomAvatar>
            <img 
              src={image} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </CustomAvatar>
          <InputHidden 
            type="file" 
            ref={inputRef} 
            onChange={handleImageChange}
          />
        </AvatarContainer>

        <h1 className="text-lg font-semibold mb-2">Title</h1>
        <TextField 
          variant="outlined"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
          className="mb-4"
        />

        <h1 className="text-lg font-semibold mb-2">Description</h1>
        <TextField 
          variant="outlined"
          placeholder="Enter description"
          value={description}
          onChange={handleDescriptionChange}
          className="mb-4"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="mt-auto"
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default MoreT;
