'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Panelist {
    _id: string;
    name: string;
    expertise: string;
    email:string;
  }
  
  interface Candidate {
    _id: string;
    firstName: string;
    lastName: string;
    positionApplied: string;
    status: string;
    result: string;
  }
export default function AdminPage() {
  //const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [panelists, setPanelists] = useState<Panelist[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedPanelist, setSelectedPanelist] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const token = localStorage.getItem('token') || ''; // Provide fallback if null

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        setIsLoggedIn(true);
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Invalid login credentials');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  // Fetch Panelists and Candidates on successful login
  useEffect(() => {
    if (isLoggedIn) {
      fetchPanelists(token);
      fetchCandidates(token);
    }
  }, [isLoggedIn]);

  const fetchPanelists = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3000/admin/panelists', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const panelistsData = await response.json();
      setPanelists(panelistsData);
    } catch (error) {
      console.error('Error fetching panelists:', error);
    }
  };

  const fetchCandidates = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3000/admin/candidates', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const candidatesData = await response.json();
      setCandidates(candidatesData);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  // Assign Panelist to Candidate
  const handleAssignPanelist = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/admin/assign-panelist', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ candidateId: selectedCandidate, panelistName: selectedPanelist }),
      });

      if (response.ok) {
        alert('Panelist assigned successfully');
      } else {
        alert('Failed to assign panelist');
      }
    } catch (error) {
      alert('An error occurred while assigning panelist');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        {!isLoggedIn ? (
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="text-center">Admin Login</h3>
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="text-danger">{errorMessage}</div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2>Admin Dashboard</h2>
            <p>Welcome, Admin. Manage panelists and candidates below.</p>

            {/* Panelists Section */}
            <section id="panelists-section" className="mt-4">
              <h3>Panelists</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Expertise</th>
                    <th>Assign to Candidate</th>
                  </tr>
                </thead>
                <tbody>
                  {panelists.map((panelist, idx) => (
                    <tr key={idx}>
                      <td>{panelist.name}</td>
                      <td>{panelist.expertise}</td>
                      <td>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#assignModal" onClick={() => setSelectedPanelist(panelist.email)}>
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Candidates Section */}
            <section id="candidates-section" className="mt-4">
              <h3>Candidates</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position Applied</th>
                    <th>Status</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate, idx) => (
                    <tr key={idx}>
                      <td>{candidate.firstName} {candidate.lastName}</td>
                      <td>{candidate.positionApplied}</td>
                      <td>{candidate.status}</td>
                      <td>{candidate.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Modal for Assigning Panelists */}
            <div className="modal fade" id="assignModal" tabIndex={-1} aria-labelledby="assignModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="assignModalLabel">Assign Panelist to Candidate</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleAssignPanelist}>
                      <div className="mb-3">
                        <label htmlFor="candidateSelect" className="form-label">Select Candidate</label>
                        <select className="form-select" value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)}>
                          <option value="">Select a Candidate</option>
                          {candidates.map((candidate, idx) => (
                            <option key={idx} value={candidate._id}>
                              {candidate.firstName} {candidate.lastName} - {candidate.positionApplied}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary">Assign</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
