import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import LoadingButton from '../components/LoadingButton';
import API from '../api';
import axios from 'axios';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setApiError('');
    try {
      const res = await API.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
      // Save token, redirect, etc.
      // localStorage.setItem('token', res.data.token);
      // navigate('/dashboard');
      alert('Login successful! Token: ' + res.data.token);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setApiError('Invalid email or password.');
      } else {
        setApiError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Bucket">
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
          autoComplete="current-password"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" {...register('remember')} />
            Remember me
          </label>
          <Link to="/forgot" className="text-blue-600 hover:underline text-sm">Forgot Password?</Link>
        </div>
        {apiError && <div className="text-red-500 text-sm mb-2">{apiError}</div>}
        <LoadingButton type="submit" loading={loading}>Sign In</LoadingButton>
      </form>
      <div className="mt-6 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">Create Account</Link>
      </div>
    </AuthCard>
  );
};

export default Login;
