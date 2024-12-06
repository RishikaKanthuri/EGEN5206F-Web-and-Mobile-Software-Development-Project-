 'use client';



import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CandidateData {
  firstName: string;
  lastName: string;
  email: string;
  positionApplied: string;
  status: string;
  result: string;
}

const CandidatePage: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [candidate, setCandidate] = useState<CandidateData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Candidate Profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) {
        setError('Email not provided');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token missing. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/candidates/${email}/profile`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API Response:', response); 

        if (!response.ok) {
          //throw new Error('Failed to fetch profile');
           
        }

        const data: CandidateData = await response.json();
        setCandidate(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  // Render Loading State
  if (loading) {
    return <div className="container mt-5"><h3>Loading Candidate Profile...</h3></div>;
  }

  // Render Error State
  if (error) {
    return <div className="container mt-5"><h3 className="text-danger">{error}</h3></div>;
  }

  // Render Candidate Profile
  return (
    <div>
      <Navbar /> 
    <div className="container mt-5">
      <h2>Welcome, {candidate?.firstName} {candidate?.lastName}</h2>
       {/* Personal Details Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Personal Details</h4>
          <p><strong>First Name:</strong> {candidate?.firstName}</p>
          <p><strong>Last Name:</strong> {candidate?.lastName}</p>
          <p><strong>Email:</strong> {candidate?.email}</p>
        </div>
      </div>
      {/* Profile Details Section */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Profile Information</h4>
          <p><strong>Position Applied:</strong> {candidate?.positionApplied}</p>
          <p><strong>Status:</strong> {candidate?.status}</p>
          <p><strong>Result:</strong> {candidate?.result}</p>
        </div>
      </div>
      <Link href='/interview' className='btn btn-primary'>Go to Interviews</Link>
    </div>
    <Footer/>
    </div>
  );
};

export default CandidatePage;
