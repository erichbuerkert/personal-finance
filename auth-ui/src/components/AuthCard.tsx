import React from 'react';

const AuthCard: React.FC<{ children: React.ReactNode; title: string; }>
  = ({ children, title }) => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-wide">{title}</h1>
      </div>
      {children}
    </div>
  </div>
);

export default AuthCard;
