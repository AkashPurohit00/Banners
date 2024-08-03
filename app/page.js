"use client"
import React, { useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreT from '@/components/MoreT';

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [images, setImages] = useState([
    { src: "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/1/square.png", title: "Next.js", description: "Welcome to this exciting journey", userImage: null },
    { src: "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/1/square.png", title: "React.js", description: "React.js for building UI", userImage: null },
    { src: "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/1/square.png", title: "Node.js", description: "Node.js for server-side", userImage: null },
    { src: "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/1/square.png", title: "JavaScript", description: "JavaScript programming", userImage: null },
    { src: "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/1/square.png", title: "CSS", description: "Styling with CSS", userImage: null },
    { src: "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/1/square.png", title: "HTML", description: "HTML for structuring", userImage: null }
  ]);

  const handleClickOpen = (index) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveIndex(null);
  };

  const handleUpdate = (updatedImage) => {
    const newImages = [...images];
    newImages[activeIndex] = { ...newImages[activeIndex], ...updatedImage };
    setImages(newImages);
    handleClose();
  };

  return (
    <div className="bg-blue-500 min-h-screen min-w-screen flex justify-center items-center">
      <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
        {images.map((image, index) => (
          <div key={index} className="relative col-span-1 row-span-1">
            <div className="relative w-full h-full">
              <img className="h-56 w-96 object-cover" src={image.src} alt={`Image ${index + 1}`} />
              {image.userImage && (
                <div className="absolute bottom-2 right-2 rounded-full overflow-hidden w-16 h-16 bg-white shadow-lg z-20">
                  <img 
                    src={image.userImage} 
                    alt="User" 
                    className="w-full h-full object-cover"
                    style={{ clipPath: 'circle(50%)' }}
                  />
                </div>
              )}
              <div className="absolute inset-0 flex flex-col justify-center items-start p-4 bg-gradient-to-r from-transparent to-transparent opacity-75 text-black" style={{ width: '50%' }}>
                <h1 className='text-2xl font-extrabold mb-2 truncate w-40'>{image.title}</h1>
                <h2 className='text-sm font-bold truncate w-40'>{image.description}</h2>
              </div>
              <div className='absolute inset-0 flex justify-end items-start z-30'>
                <IconButton 
                  className="absolute top-0 right-0 m-2 p-0"
                  aria-label="edit"
                  onClick={() => handleClickOpen(index)}
                >
                  <EditIcon fontSize="small" className="text-black" />
                </IconButton>
              </div>
              <button 
                className="absolute bottom-0 left-0 m-2 p-2 text-xs text-yellow-500 bg-black rounded z-10"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Image</DialogTitle>
        <DialogContent>
          {activeIndex !== null && (
            <MoreT 
              title={images[activeIndex].title}
              description={images[activeIndex].description}
              image={images[activeIndex].src}
              onSave={(updatedImage) => handleUpdate(updatedImage)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Page;
