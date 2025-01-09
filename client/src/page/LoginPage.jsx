import React, { useState } from 'react';
import { 
  Alert, 
  Box, 
  Typography, 
  TextField,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Mail, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import CustomButton from './../components/CustomButton';
import img from '../assets/loginImage.jpg';
import styles from '../styles/LoginForm.module.css'; 

const LoginPage = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form submitted:', formData);
      setAlertMessage(null);
    } catch (error) {
      setAlertMessage('This is an info alert — check it out!');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginFormSection}>
          <div className={styles.welcomeText}>
            <Typography className={styles.formTitle} variant="h4">
              Welcome Back!
            </Typography>
            <Typography className={styles.formSubtitle} variant="body1">
              Please sign in to continue
            </Typography>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className={styles.formGroup}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className={styles.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>

            <div className={styles.formActions}>
              <CustomButton
                button="Sign In"
                onClick={handleSubmit}
                fullWidth
              />
            </div>

            <div className={styles.signupPrompt}>
              Don't have an account?
              <a href="#" className={styles.signupLink}>Sign up</a>
            </div>
          </form>
        </div>

        <div className={styles.loginImageSection}>
          <img src={img} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
