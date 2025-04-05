
import { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import { Card } from '@/components/ui/card';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-blue-50 flex flex-col justify-center items-center p-6">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center bg-brand-500 text-white p-2 rounded-md mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-8 h-8"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18"></path>
            <path d="M8 9h8"></path>
            <path d="M8 15h8"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SkillSync</h1>
        <p className="text-gray-600 max-w-md text-center">
          AI-powered Resume Screening and Guidance for Job Seekers and HR Professionals
        </p>
      </div>

      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
      
      <Card className="w-full max-w-md mt-8 p-4 bg-white/80 backdrop-blur-sm">
        <div className="text-sm text-gray-600">
          <h3 className="font-medium mb-2 text-center">About SkillSync</h3>
          <p className="text-center mb-2">
            SkillSync helps job seekers optimize their resumes while streamlining the hiring process for recruiters.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium">For Job Seekers:</p>
              <ul className="list-disc list-inside">
                <li>Get AI-powered resume analysis</li>
                <li>Match your skills to job descriptions</li>
                <li>Receive improvement suggestions</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">For HR Professionals:</p>
              <ul className="list-disc list-inside">
                <li>Access detailed candidate insights</li>
                <li>Filter candidates by match scores</li>
                <li>Track skill matches and gaps</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
