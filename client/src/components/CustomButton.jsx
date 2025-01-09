import React from 'react';
import { Button as MuiButton } from '@mui/material';

const CustomButton = ({ button, onClick, disabled, fullWidth, type = 'button', size = 'medium' }) => {
  const buttonStyles = {
    sx: {
      border: 0,
      borderRadius: '8px',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      color: 'white',
      padding: size === 'large' ? '12px 32px' : '8px 24px',
      textTransform: 'none',
      fontWeight: 600,
      transition: 'all 0.3s ease',
    }
  };

  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      type={type}
      {...buttonStyles}
    >
      {button}
    </MuiButton>
  );
};

export default CustomButton;