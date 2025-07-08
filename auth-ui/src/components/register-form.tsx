import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import API from '../api/axios';
import axios from 'axios';
import stockChart from "../assets/stock-chart.jpeg";
import { appleIcon, metaIcon, googleIcon } from '@/constants/icons';

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormInputs) => {
    setApiError('');
    try {
      await API.post('/auth/register', {
        email: data.email,
        password: data.password,
      });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setApiError('An account with this email already exists.');
      } else {
        setApiError('Registration failed. Please try again.');
      }
    }
  };

    const providers = [
        { icon: appleIcon, label: 'Sign up with Apple' },
        { icon: googleIcon, label: 'Sign up with Google' },
        { icon: metaIcon, label: 'Sign up with Meta' },
    ];

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Sign up</h1>
                <p className="text-muted-foreground text-balance">
                  Create your Brick account
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
                  <Label htmlFor="new-password">Password</Label>
                </div>
                <Input 
                    id="new-password" 
                    type="password" 
                    autoComplete="new-password"
                    required
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Use 8+ characters' },
                    })}
                    error={errors.password?.message}
                />
              </div>
                <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>
                <Input 
                    id="confirm-password" 
                    type="password" 
                    autoComplete="new-password"
                    required
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value: string) => value === password || 'Passwords do not match',
                    })}
                    error={errors.confirmPassword?.message}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign up
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
                Already have an account?{" "}
                <Link to="/login" className="underline-offset-4 hover:underline">Log in</Link>
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
