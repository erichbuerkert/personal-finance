import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import API from '../api/axios';
import axios from 'axios';
import stockChart from "../assets/stock-chart.jpeg";
import { appleIcon, metaIcon, googleIcon } from '@/constants/icons';

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [apiError, setApiError] = useState('');

  const onSubmit = async (data: LoginFormInputs) => {
    setApiError('');
    try {
      const res = await API.post('auth-service/auth/login', {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem('token', res.data.token);
      window.location.href = 'http://localhost:5173';
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setApiError('Invalid email or password.');
      } else {
        setApiError('Login failed. Please try again.');
      }
    }
  };

  const providers = [
    { icon: appleIcon, label: 'Login with Apple' },
    { icon: googleIcon, label: 'Login with Google' },
    { icon: metaIcon, label: 'Login with Meta' },
  ];

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Brick account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  autoComplete="email"
                  {...register('email', { required: 'Email is required', pattern: { value: /.+@.+\..+/, message: 'Invalid email' } })}
                  error={errors.email?.message}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  autoComplete="current-password"
                  required
                  {...register('password', { required: 'Password is required' })}
                  error={errors.password?.message}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {providers.map(({ icon, label }) => (
                  <Button key={label} variant="outline" type="button" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d={icon} fill="currentColor" />
                    </svg>
                    <span className="sr-only">{label}</span>
                  </Button>
                ))}
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline-offset-4 hover:underline">Sign up</Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={stockChart}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
