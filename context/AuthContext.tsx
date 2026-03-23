import React, { createContext, useState, useContext, useEffect } from 'react';
import { router } from 'expo-router';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  verifyEmail: (code: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  sendVerificationCode: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tempEmail, setTempEmail] = useState<string | null>(null);

  // Mock Login
  const login = async (email: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'Test Student',
        email: email,
        studentId: '20240001',
        department: 'Computer Science',
      });
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  // Mock Signup
  const signup = async (data: any) => {
    setIsLoading(true);
    setTimeout(() => {
      // In a real app, you'd create the user here.
      // For this mock, we just proceed to verification or login.
      setTempEmail(data.email);
      setIsLoading(false);
      // router.push('/auth/verify'); // Assuming flow
    }, 1000);
  };

  // Mock Send Verification Code
  const sendVerificationCode = async (email: string) => {
    setTempEmail(email);
    console.log(`Sending code to ${email}`);
    // Simulate API
    return new Promise<void>((resolve) => setTimeout(resolve, 500));
  };

  // Mock Verify Email
  const verifyEmail = async (code: string) => {
    setIsLoading(true);
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        if (code === '123456') {
          // Success
          setUser({
            id: '1',
            name: 'New Student',
            email: tempEmail || 'student@school.ac.jp',
            studentId: '20240002',
            department: 'New Dept',
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    router.replace('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        verifyEmail,
        logout,
        isAuthenticated: !!user,
        sendVerificationCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
