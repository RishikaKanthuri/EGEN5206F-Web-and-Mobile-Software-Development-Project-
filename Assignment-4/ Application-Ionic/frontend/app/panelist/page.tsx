'use client';

import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from 'next/navigation';
// Define types for Interviews and Candidates
interface Interview {
  position: string;
  company: string;
  scheduledDate: string;
}

interface Candidate {
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  education: string;
}

export default function PanelistPage() {
  const [panelistName, setPanelistName] = useState('');
   
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const panelistEmail = searchParams.get('email');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  // Fetch Panelist Profile and Interviews
  useEffect(() => {
    const fetchPanelistProfile = async () => {
        
      
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3000/interviews/panelist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  
        },
        body: JSON.stringify({ panelistEmail }),
      });

      const data = await response.json();
      setPanelistName(data[0]?.panelist || 'Panelist');
      setInterviews(data);
    };

    fetchPanelistProfile();
  }, []);

  // Fetch Candidates for Selected Interview
  const showCandidates = async (positionApplied: string) => {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/candidates/interview-candidates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ positionApplied, panelist: panelistEmail }),
    });

    const candidatesData = await response.json();
    setCandidates(candidatesData);
    setSelectedInterview(positionApplied);
  };

  // Handle Feedback Input Change
  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  // Submit Feedback
  const submitFeedback = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/candidates/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        candidateEmail: selectedCandidate?.email,
        recommendation:feedback,
      }),
    });

    if (response.ok) {
      alert('Feedback submitted successfully');
      setIsFeedbackVisible(false);
    } else {
      alert('Failed to submit feedback');
    }
  };


  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1>Welcome, {panelistName}</h1>
        <h2>Your Upcoming Interviews</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Position</th>
              <th>Company</th>
              <th>Scheduled Date</th>
              <th>Candidates</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview, idx) => (
              <tr key={idx}>
                <td>{interview.position}</td>
                <td>{interview.company}</td>
                <td>{new Date(interview.scheduledDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => showCandidates(interview.position)}
                  >
                    View Candidates
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedInterview && (
          <>
            <h2>Candidates for {selectedInterview}</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Skills</th>
                  <th>Education</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, idx) => (
                  <tr key={idx}>
                    <td>{candidate.firstName} {candidate.lastName}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.skills.join(', ')}</td>
                    <td>{candidate.education}</td>
                    <td>
                    <button
                        className="btn btn-success"
                        onClick={() => {
                          setSelectedCandidate(candidate);
                          setIsFeedbackVisible(true);
                        }}
                      >
                        Give Feedback
                      </button> 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {isFeedbackVisible && selectedCandidate && (
          <div className="mt-4">
            <h3>Provide Feedback for {selectedCandidate.firstName} {selectedCandidate.lastName}</h3>
            <textarea
              className="form-control"
              rows={4}
              value={feedback}
              onChange={handleFeedbackChange}
            />
            <button className="btn btn-primary mt-3" onClick={submitFeedback}>
              Submit Feedback
            </button>
            <button className="btn btn-secondary ms-3" onClick={() => setIsFeedbackVisible(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
