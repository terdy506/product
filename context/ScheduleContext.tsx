import React, { createContext, useState, useContext } from 'react';

export type ClassSession = {
  id: string;
  subject: string;
  professor: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  startTime: string; // "09:00"
  endTime: string;   // "10:30"
  color: string;
};

type ScheduleContextType = {
  classes: ClassSession[];
  addClass: (cls: Omit<ClassSession, 'id'>) => void;
};

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

const INITIAL_CLASSES: ClassSession[] = [
  {
    id: '1',
    subject: 'Calculus I',
    professor: 'Prof. Smith',
    day: 'Mon',
    startTime: '09:00',
    endTime: '10:30',
    color: '#E0F2FE', // light blue
  },
  {
    id: '2',
    subject: 'Physics 101',
    professor: 'Prof. Johnson',
    day: 'Mon',
    startTime: '11:00',
    endTime: '12:30',
    color: '#DCFCE7', // light green
  },
  {
    id: '3',
    subject: 'Calculus I',
    professor: 'Prof. Smith',
    day: 'Wed',
    startTime: '09:00',
    endTime: '10:30',
    color: '#E0F2FE',
  },
];

export const ScheduleProvider = ({ children }: { children: React.ReactNode }) => {
  const [classes, setClasses] = useState<ClassSession[]>(INITIAL_CLASSES);

  const addClass = (clsData: Omit<ClassSession, 'id'>) => {
    const newClass: ClassSession = {
      ...clsData,
      id: Math.random().toString(),
    };
    setClasses([...classes, newClass]);
  };

  return (
    <ScheduleContext.Provider value={{ classes, addClass }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};
