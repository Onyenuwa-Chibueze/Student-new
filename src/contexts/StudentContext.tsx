import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Student {
  id: string;
  name: string;
  age: number;
  department: string;
  regNumber: string;
  email: string;
  phone: string;
  gender: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: "added" | "edited" | "deleted";
  studentName: string;
  timestamp: string;
}

interface StudentContextType {
  students: Student[];
  activityLog: ActivityLog[];
  addStudent: (s: Omit<Student, "id" | "createdAt">) => void;
  updateStudent: (id: string, s: Omit<Student, "id" | "createdAt">) => void;
  deleteStudent: (id: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(() => {
    const stored = localStorage.getItem("students_db");
    return stored ? JSON.parse(stored) : [];
  });

  const [activityLog, setActivityLog] = useState<ActivityLog[]>(() => {
    const stored = localStorage.getItem("activity_log");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("students_db", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("activity_log", JSON.stringify(activityLog));
  }, [activityLog]);

  const logActivity = (action: ActivityLog["action"], studentName: string) => {
    setActivityLog((prev) => [
      { id: crypto.randomUUID(), action, studentName, timestamp: new Date().toISOString() },
      ...prev.slice(0, 49),
    ]);
  };

  const addStudent = (s: Omit<Student, "id" | "createdAt">) => {
    setStudents((prev) => [...prev, { ...s, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
    logActivity("added", s.name);
  };

  const updateStudent = (id: string, s: Omit<Student, "id" | "createdAt">) => {
    setStudents((prev) => prev.map((st) => (st.id === id ? { ...st, ...s } : st)));
    logActivity("edited", s.name);
  };

  const deleteStudent = (id: string) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((st) => st.id !== id));
    if (student) logActivity("deleted", student.name);
  };

  return (
    <StudentContext.Provider value={{ students, activityLog, addStudent, updateStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudents must be used within StudentProvider");
  return ctx;
};
