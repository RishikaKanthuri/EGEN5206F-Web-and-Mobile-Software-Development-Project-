 'use client';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
 
import 'bootstrap/dist/css/bootstrap.min.css';
 

interface Interview {
  _id: string;
  position: string;
  company: string;
  description: string;
}
export default function InterviewPage() {
  
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    education: '',
    skills: '',
    resume: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);

  // Fetch interviews when the component loads
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch('http://localhost:3000/interviews');
        if (!response.ok) throw new Error('Failed to fetch interviews');
        const data = await response.json();
        setInterviews(data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };
    fetchInterviews();
  }, []);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
    if(e.target.files){
    setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  // Handle form submission
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!selectedInterview) {
      alert('No interview selected');
      return;
    }
    const payload = {
      email: formData.email,
      education: formData.education,
      skills: formData.skills,
      positionApplied: selectedInterview?.position, // Ensure you send the correct position
    };
    try {
      const response = await fetch(`http://localhost:3000/candidates/apply/${selectedInterview?.position}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
         
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Reset after submission
  if (submitted) {
    return (
      <div className="container mt-5 text-center">
        <h3>Application Submitted!</h3>
        <p>Thank you for applying to {selectedInterview?.position} at {selectedInterview?.company}.</p>
        <button className="btn btn-primary" onClick={() => { setSelectedInterview(null); setSubmitted(false); }}>
          View More Jobs
        </button>
      </div>
    );
  }

  return (
    <div>{/* Navbar */}
     <Navbar/> 
    <div className="container mt-5">
      {!selectedInterview ? (
        <>
          <h2>Featured Interviews</h2>
          <div className="row">
            {interviews.length > 0 ? (
              interviews.map((interview) => (
              <div key={interview._id} className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{interview.position}</h5>
                    <p className="card-text">{interview.company}</p>
                    <p className="card-text">{interview.description}</p>
                    <button className="btn btn-success" onClick={() => setSelectedInterview(interview)}>
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No interviews available at the moment.</p>
          )}
            
          </div>
        </>
      ) : (
        <div>
          <h2>Apply for {selectedInterview?.position} at {selectedInterview?.company}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender:</label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="education" className="form-label">Education:</label>
              <input
                type="text"
                className="form-control"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="skills" className="form-label">Skills:</label>
              <input
                type="text"
                className="form-control"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="resume" className="form-label">Upload Resume:</label>
              <input
                type="file"
                className="form-control"
                id="resume"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button className="btn btn-secondary ms-3" onClick={() => setSelectedInterview(null)}>
              Back to Job Listings
            </button>
          </form>
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
}
