'use client';

import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonSelect, IonSelectOption, IonToast } from '@ionic/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
 

interface Interview {
  _id: string;
  position: string;
  company: string;
  description: string;
}

const InterviewPage: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInterview) {
      alert('No interview selected');
      return;
    }
    const payload = {
      email: formData.email,
      education: formData.education,
      skills: formData.skills,
      positionApplied: selectedInterview?.position,
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

  if (submitted) {
    return (
      <IonPage>
        <Navbar />
        <IonContent className="ion-padding">
          <h3>Application Submitted!</h3>
          <p>Thank you for applying to {selectedInterview?.position} at {selectedInterview?.company}.</p>
          <IonButton expand="full" onClick={() => { setSelectedInterview(null); setSubmitted(false); }}>
            View More Jobs
          </IonButton>
        </IonContent>
        <Footer />
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Navbar />
      <IonContent className="ion-padding">
        {!selectedInterview ? (
          <>
            <IonCard>
              <IonCardHeader><IonTitle>Featured Interviews</IonTitle></IonCardHeader>
              <IonCardContent>
                {interviews.length > 0 ? (
                  interviews.map((interview) => (
                    <IonCard key={interview._id}>
                      <IonCardHeader><IonTitle>{interview.position} at {interview.company}</IonTitle></IonCardHeader>
                      <IonCardContent>
                        <p>{interview.description}</p>
                        <IonButton expand="full" onClick={() => setSelectedInterview(interview)}>Apply Now</IonButton>
                      </IonCardContent>
                    </IonCard>
                  ))
                ) : (
                  <p>No interviews available at the moment.</p>
                )}
              </IonCardContent>
            </IonCard>
          </>
        ) : (
          <IonCard>
            <IonCardHeader>Apply for {selectedInterview?.position} at {selectedInterview?.company}</IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel>Name:</IonLabel>
                <IonInput value={formData.name} onIonChange={(e) => setFormData({ ...formData, name: e.detail.value! })} required />
              </IonItem>
              <IonItem>
                <IonLabel>Gender:</IonLabel>
                <IonSelect value={formData.gender} onIonChange={(e) => setFormData({ ...formData, gender: e.detail.value! })}>
                  <IonSelectOption value="Male">Male</IonSelectOption>
                  <IonSelectOption value="Female">Female</IonSelectOption>
                  <IonSelectOption value="Other">Other</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Email:</IonLabel>
                <IonInput type="email" value={formData.email} onIonChange={(e) => setFormData({ ...formData, email: e.detail.value! })} required />
              </IonItem>
              <IonItem>
                <IonLabel>Education:</IonLabel>
                <IonInput value={formData.education} onIonChange={(e) => setFormData({ ...formData, education: e.detail.value! })} required />
              </IonItem>
              <IonItem>
                <IonLabel>Skills:</IonLabel>
                <IonInput value={formData.skills} onIonChange={(e) => setFormData({ ...formData, skills: e.detail.value! })} required />
              </IonItem>
              <IonItem>
                <IonLabel>Upload Resume:</IonLabel>
                <input type="file" />
              </IonItem>
              <IonButton expand="full" onClick={handleSubmit}>Submit</IonButton>
              <IonButton expand="full" fill="outline" onClick={() => setSelectedInterview(null)}>Back to Job Listings</IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default InterviewPage;
