'use client';
import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonTextarea, IonCard, IonCardHeader, IonCardContent, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import { useLocation } from 'react-router-dom'; // For getting query params from URL
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css'
const PanelistPage: React.FC = () => {
  const location = useLocation(); 
  const panelistEmail = new URLSearchParams(location.search).get('email');  // Get email from URL

  const [panelistName, setPanelistName] = useState('');
  const [interviews, setInterviews] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

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

  const handleFeedbackChange = (e: any) => {
    setFeedback(e.target.value);
  };

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
        recommendation: feedback,
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
    <IonPage>
      <Navbar />
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonTitle>Welcome, {panelistName}</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <h2>Your Upcoming Interviews</h2>
            <IonGrid>
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
                      <IonButton onClick={() => showCandidates(interview.position)}>
                        View Candidates
                      </IonButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </IonGrid>

            {selectedInterview && (
              <>
                <h2>Candidates for {selectedInterview}</h2>
                <IonText>No Candidates Assigned To Panelist Yet</IonText>
                {/* <IonGrid>
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
                          <IonButton
                            onClick={() => {
                              setSelectedCandidate(candidate);
                              setIsFeedbackVisible(true);
                            }}
                          >
                            Give Feedback
                          </IonButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </IonGrid> */}
              </>
            )}
            {isFeedbackVisible && selectedCandidate && (
              <div className="mt-4">
                <h3>Provide Feedback for {selectedCandidate.firstName} {selectedCandidate.lastName}</h3>
                <IonTextarea
                  value={feedback}
                  onIonChange={handleFeedbackChange}
                  placeholder="Enter feedback here"
                  rows={4}
                />
                <IonButton onClick={submitFeedback}>Submit Feedback</IonButton>
                <IonButton fill="outline" onClick={() => setIsFeedbackVisible(false)}>
                  Cancel
                </IonButton>
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default PanelistPage;
