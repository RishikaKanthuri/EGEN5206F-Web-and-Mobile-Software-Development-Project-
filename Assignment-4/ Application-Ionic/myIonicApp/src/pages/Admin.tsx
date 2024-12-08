import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonModal, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
interface Panelist {
  _id: string;
  name: string;
  expertise: string;
  email: string;
}

interface Candidate {
  _id: string;
  firstName: string;
  lastName: string;
  positionApplied: string;
  status: string;
  result: string;
}

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [panelists, setPanelists] = useState<Panelist[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedPanelist, setSelectedPanelist] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token') || '';

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
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });
      const candidatesData = await response.json();
      setCandidates(candidatesData);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleAssignPanelist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/admin/assign-panelist', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ candidateId: selectedCandidate, panelistName: selectedPanelist }),
      });

      if (response.ok) {
        alert('Panelist assigned successfully');
        setShowModal(false);
      } else {
        alert('Failed to assign panelist');
      }
    } catch (error) {
      alert('An error occurred while assigning panelist');
    }
  };

  return (
    <IonPage>
        <Navbar/>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!isLoggedIn ? (
          <IonCard>
            <IonCardHeader>
              <IonTitle>Admin Login</IonTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel position="stacked">Username</IonLabel>
                <IonInput value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
              </IonItem>
              <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
              <p className="text-danger">{errorMessage}</p>
            </IonCardContent>
          </IonCard>
        ) : (
          <div>
            <h2>Manage Panelists and Candidates</h2>

            <IonCard>
              <IonCardHeader>
                <IonTitle>Panelists</IonTitle>
              </IonCardHeader>
              <IonCardContent>
                {panelists.map((panelist) => (
                  <IonItem key={panelist._id}>
                    <IonLabel>{panelist.name} ({panelist.expertise})</IonLabel>
                    <IonButton onClick={() => { setSelectedPanelist(panelist.email); setShowModal(true); }}>Assign</IonButton>
                  </IonItem>
                ))}
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonTitle>Candidates</IonTitle>
              </IonCardHeader>
              <IonCardContent>
                {candidates.map((candidate) => (
                  <IonItem key={candidate._id}>
                    <IonLabel>{candidate.firstName} {candidate.lastName}</IonLabel>
                    <IonLabel>Position: {candidate.positionApplied}</IonLabel>
                    <IonLabel>Status: {candidate.status}</IonLabel>
                    <IonLabel>Result:{candidate.result}</IonLabel>
                  </IonItem>
                ))}
              </IonCardContent>
            </IonCard>

            <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
              <IonCard>
                <IonCardHeader>
                  <IonTitle>Assign Panelist to Candidate</IonTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="stacked">Select Candidate</IonLabel>
                    <IonSelect value={selectedCandidate} onIonChange={(e) => setSelectedCandidate(e.detail.value!)}>
                      {candidates.map((candidate) => (
                        <IonSelectOption key={candidate._id} value={candidate._id}>
                          {candidate.firstName} {candidate.lastName} - {candidate.positionApplied}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                  <IonButton expand="block" onClick={handleAssignPanelist}>Assign</IonButton>
                  <IonButton expand="block" color="danger" onClick={() => setShowModal(false)}>Cancel</IonButton>
                </IonCardContent>
              </IonCard>
            </IonModal>
          </div>
        )}
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default AdminPage;
