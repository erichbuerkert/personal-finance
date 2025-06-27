import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import LoadingButton from '../components/LoadingButton';
import API from '../api';
import axios from 'axios';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const Register: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setApiError('');
    try {
      await API.post('/auth/register', {
        email: data.email,
        password: data.password,
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setApiError('An account with this email already exists.');
      } else {
        setApiError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create Account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          {...register('email', { required: 'Email is required', pattern: { value: /.+@.+\..+/, message: 'Invalid email' } })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Use 8+ characters' },
          })}
          error={errors.password?.message}
        />
        <div className="text-xs text-gray-500 mb-2 ml-1">Use 8+ characters, including a number and a letter.</div>
        <Input
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match',
          })}
          error={errors.confirmPassword?.message}
        />
        <label className="flex items-center text-sm mb-4">
          <input type="checkbox" className="mr-2" {...register('terms', { required: 'You must agree to the terms' })} />
          I agree to the <a href="#" className="text-blue-600 hover:underline ml-1">Terms & Privacy</a>
        </label>
        {errors.terms && <div className="text-red-500 text-xs mb-2">{errors.terms.message}</div>}
        {apiError && <div className="text-red-500 text-sm mb-2">{apiError}</div>}
        {success && <div className="text-green-600 text-sm mb-2">Registration successful! Redirecting...</div>}
        <LoadingButton type="submit" loading={loading}>Create Account</LoadingButton>
      </form>
      <div className="mt-6 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
      </div>
    </AuthCard>
  );
};

export default Register;
