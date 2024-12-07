'use client';
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardContent, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import { useLocation } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';
const CandidatePage: React.FC = () => {
  const location = useLocation();   
  const email = new URLSearchParams(location.search).get('email');   
  const [candidate, setCandidate] = useState<any | null>(null);
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

        if (!response.ok) {
          setError('Failed to fetch profile');
        } else {
          const data = await response.json();
          setCandidate(data);
        }
      } catch (err) {
        setError('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  // Render Loading State
  if (loading) {
    return (
      <IonPage>
        <Navbar />
        <IonContent className="ion-padding">
          <IonText color="primary">
            <h3>Loading Candidate Profile...</h3>
          </IonText>
        </IonContent>
        <Footer />
      </IonPage>
    );
  }

  // Render Error State
  if (error) {
    return (
      <IonPage>
        <Navbar />
        <IonContent className="ion-padding">
          <IonText color="danger">
            <h3>{error}</h3>
          </IonText>
        </IonContent>
        <Footer />
      </IonPage>
    );
  }

  // Render Candidate Profile
  return (
    <IonPage>
      <Navbar />
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonTitle>Welcome, {candidate?.firstName} {candidate?.lastName}</IonTitle>
          </IonCardHeader>
          <IonCardContent className="detail-item">
            {/* Personal Details Section */}
            <IonItem >
              <IonLabel position="stacked">First Name</IonLabel>
              <IonInput value={candidate?.firstName} readonly />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Last Name</IonLabel>
              <IonInput value={candidate?.lastName} readonly />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput value={candidate?.email} readonly />
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Profile Details Section */}
        <IonCard>
          <IonCardHeader>
            <IonTitle>Profile Information</IonTitle>
          </IonCardHeader>
          <IonCardContent >
            <IonItem className='detail-item'>
              <IonLabel position="stacked">Position Applied</IonLabel>
              <IonInput value={candidate?.positionApplied} readonly />
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Status</IonLabel>
              <IonInput value={candidate?.status} readonly />
            </IonItem>
            <IonItem>
              <IonLabel position='stacked'>Result</IonLabel>
              <IonInput value={candidate?.result} readonly />
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonButton expand="full" routerLink="/interview">Go to Interviews</IonButton>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default CandidatePage;
 
