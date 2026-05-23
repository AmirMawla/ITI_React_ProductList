import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { LanguageContext } from '../context/LanguageContext';
import { use } from 'react';
import { useTheme } from '../store/useThemeStore';

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  username: z.string().min(1, { message: 'Username is required' }).refine(s => !s.includes(' '), 'Username cannot contain spaces'),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).regex(passwordValidation, {
    message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
  }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
  });
  const navigate = useNavigate();
  const { language } = use(LanguageContext);
  const { theme } = useTheme();

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
    navigate('/');
  };

  return (
    <div className={`container mx-auto p-4 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900 text-white'}`}>
      <h1 className="text-3xl font-bold mb-6">{language === 'en' ? 'Register' : 'تسجيل'}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="name">{language === 'en' ? 'Name' : 'الاسم'}</FieldLabel>
            <Input id="name" {...register('name')} />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">{language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}</FieldLabel>
            <Input id="email" {...register('email')} />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="username">{language === 'en' ? 'Username' : 'اسم المستخدم'}</FieldLabel>
            <Input id="username" {...register('username')} />
            {errors.username && <FieldError>{errors.username.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">{language === 'en' ? 'Password' : 'كلمة المرور'}</FieldLabel>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <FieldError>{errors.password.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmPassword">{language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}</FieldLabel>
            <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && <FieldError>{errors.confirmPassword.message}</FieldError>}
          </Field>
          <div className="md:col-span-2">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (language === 'en' ? 'Registering...' : 'جار التسجيل...') : (language === 'en' ? 'Register' : 'تسجيل')}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default Register;
