'use client';
import React, { useState , useEffect} from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage() {
  const [showCandidateSignUp, setShowCandidateSignUp] = useState(false);
  const [showPanelistSignUp, setShowPanelistSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const [panelistName, setPanelistName] = useState('');
  const [panelistEmail, setPanelistEmail] = useState('');
  const [panelistPassword, setPanelistPassword] = useState('');
  const [expertise, setExpertise] = useState('');
  const [interviewName, setInterviewName] = useState('');
  const [interviews, setInterviews] = useState<any[]>([]);

  // Candidate Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/auth/candidate/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('candidateEmail', data.email);
      localStorage.setItem('token', data.token); 
      //window.location.href = `/candidate/${data.email}`;
       window.location.href = `/candidate?email=${encodeURIComponent(data.email)}`;
    } else {
      alert('Invalid credentials');
    }
  };

  // Panelist Login
  const handlePanelistLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/auth/panelist/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ panelistEmail, panelistPassword }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('panelistEmail', data.email);
      localStorage.setItem('token', data.token); 
      //window.location.href = `/panelist/${data.email}`;
      window.location.href = `/candidate?email=${encodeURIComponent(data.email)}`;

    } else {
      alert('Invalid credentials');
    }
  };

  //Candidate Registration
  const handleCandidateRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const candidateData = {
      firstName,
      lastName,
      email,
      password,
      address,
      city,
      state,
      zip
    };
  
    const response = await fetch('http://localhost:3000/candidates/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candidateData),
    });
  
    if (response.ok) {
      alert('Registration successful!');
      setShowCandidateSignUp(false); // Hide the sign-up form after successful registration
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  // Render Candidate or Panelist Sign-up Forms
  const renderCandidateSignUp = () => (
    <div className="container">
      <h2>Candidate Registration</h2>
      <form onSubmit={handleCandidateRegister}>
      <input type="text" className="form-control mb-3" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" className="form-control mb-3" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" className="form-control mb-3" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="text" className="form-control mb-3" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <input type="text" className="form-control mb-3" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
            <input type="text" className="form-control mb-3" placeholder="Zip" value={zip} onChange={(e) => setZip(e.target.value)} />
            <button type="submit" className="btn btn-primary">Register</button>
            <button className="btn btn-secondary ms-3" onClick={() => setShowCandidateSignUp(false)}>Go Back</button>
      </form>
    </div>
  );

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch('http://localhost:3000/interviews');
        if (response.ok) {
          const data = await response.json();
          setInterviews(data);
        }
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };
    fetchInterviews();
  }, []);

  //Panelist Registration Submission
  const handlePanelistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const panelistData = {
      name: panelistName,
      email: panelistEmail,
      password: panelistPassword,
      expertise,
      interviewName
    };
    const response = await fetch('http://localhost:3000/panelists/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(panelistData),
    });

    if (response.ok) {
      alert('Panelist Registration Successful!');
    } else {
      alert('Registration failed. Please try again.');
    }
  };
  
  //Panelist SignUp
  const renderPanelistSignUp = () => (
    <div className="container">
      <h2>Panelist Registration</h2>
      <form onSubmit={handlePanelistSubmit}>
      <input
          type="text"
          className="form-control mb-3"
          placeholder="Name"
          value={panelistName}
          onChange={(e) => setPanelistName(e.target.value)}
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={panelistEmail}
          onChange={(e) => setPanelistEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={panelistPassword}
          onChange={(e) => setPanelistPassword(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Expertise"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
        />
        <select
          className="form-select mb-3"
          value={interviewName}
          onChange={(e) => setInterviewName(e.target.value)}
        >
          <option value="">Select Interview</option>
          {interviews.map((interview) => (
            <option key={interview._id} value={interview.position}>
              {interview.position} at {interview.company}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <button className="btn btn-secondary ms-3" onClick={() => setShowPanelistSignUp(false)}>Go Back</button>
      </form>
    </div>
  );

  return (
    <div>
      <Navbar />
      
      {/* Conditional Rendering for Sign-Up Forms */}
      {showCandidateSignUp ? (
        renderCandidateSignUp()
      ) : showPanelistSignUp ? (
        renderPanelistSignUp()
      ) : (
        <div className="row">
          {/* Candidate Login Card */}
          <div className="col-sm-6">
            <div className="card">
              <Image src="/photos/candidates.webp" alt="Candidate" className="card-img-top" width={500} height={300} />
              <div className="card-body">
                <h5>Candidate Login</h5>
                <form onSubmit={handleLogin}>
                  <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
                <button className="btn btn-link" onClick={() => setShowCandidateSignUp(true)}>Sign Up</button>
              </div>
            </div>
          </div>

          {/* Panelist Login Card */}
          <div className="col-sm-6">
            <div className="card">
              <Image src="/photos/panelist.jpeg" alt="Panelist" className="card-img-top" width={500} height={300} />
              <div className="card-body">
                <h5>Panelist Login</h5>
                <form onSubmit={handlePanelistLogin}>
                  <input type="email" className="form-control mb-3" placeholder="Email" value={panelistEmail} onChange={(e) => setPanelistEmail(e.target.value)} />
                  <input type="password" className="form-control mb-3" placeholder="Password" value={panelistPassword} onChange={(e) => setPanelistPassword(e.target.value)} />
                  <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
                <button className="btn btn-link" onClick={() => setShowPanelistSignUp(true)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
