import { IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel, IonCard, IonCardHeader, IonCardContent, IonImg, IonTitle } from '@ionic/react';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
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
      body: JSON.stringify({ email:panelistEmail, password:panelistPassword }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('panelistEmail', data.email);
      localStorage.setItem('token', data.token); 
      window.location.href = `/panelist?email=${encodeURIComponent(data.email)}`;
 

    } else {
      alert('Invalid credentials');
    }
  };

  // Candidate Registration
  const handleCandidateRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const candidateData = { firstName, lastName, email, password, address, city, state, zip };
    const response = await fetch('http://localhost:3000/candidates/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candidateData),
    });
    if (response.ok) {
      alert('Registration successful!');
      setShowCandidateSignUp(false);
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  // Panelist Registration
  const handlePanelistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const panelistData = { name:panelistName,email: panelistEmail, password: panelistPassword, expertise: expertise, interviewName: interviewName };
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

  // Fetch Interviews for Panelist Registration
  useEffect(() => {
    const fetchInterviews = async () => {
      const response = await fetch('http://localhost:3000/interviews');
      const data = await response.json();
      setInterviews(data);
    };
    fetchInterviews();
  }, []);

   
  return (
    <IonPage>
      <Navbar />

      <IonContent className="ion-padding">
        {!showCandidateSignUp && !showPanelistSignUp ? (
          <div className="ion-text-center">
            {/* Candidate Login Card */}
            <IonCard>
              <IonImg src="/photos/candidates.webp" alt="Candidates" />
              <IonCardHeader><IonTitle>Candidate Login</IonTitle></IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonLabel position='stacked'>Email</IonLabel>
                  <IonInput value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Password</IonLabel>
                  <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
                </IonItem>
                <IonButton expand="full" onClick={handleLogin}>Sign in</IonButton>
                <IonButton fill="outline" expand="full" onClick={() => setShowCandidateSignUp(true)}>Sign Up</IonButton>
              </IonCardContent>
            </IonCard>

            {/* Panelist Login Card */}
            <IonCard>
              <IonImg src="/photos/panelist.jpeg" alt="Panelists" />
              <IonCardHeader><IonTitle>Panelist Login</IonTitle></IonCardHeader>
              <IonCardContent>
                <IonItem >
                  <IonLabel position='stacked'>Email</IonLabel>
                  <IonInput value={panelistEmail} onIonChange={(e) => setPanelistEmail(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Password</IonLabel>
                  <IonInput type="password" value={panelistPassword} onIonChange={(e) => setPanelistPassword(e.detail.value!)} />
                </IonItem>
                <IonButton expand="full" onClick={handlePanelistLogin}>Sign in</IonButton>
                <IonButton fill="outline" expand="full" onClick={() => setShowPanelistSignUp(true)}>Sign Up</IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        ) : (
          showCandidateSignUp ? (
            <IonCard>
              <IonCardHeader>Candidate Registration</IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonLabel position='stacked'>First Name</IonLabel>
                  <IonInput value={firstName} onIonChange={(e) => setFirstName(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Last Name</IonLabel>
                  <IonInput value={lastName} onIonChange={(e) => setLastName(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Email</IonLabel>
                  <IonInput value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Password</IonLabel>
                  <IonInput value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Address</IonLabel>
                  <IonInput value={address} onIonChange={(e) => setAddress(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>City</IonLabel>
                  <IonInput value={city} onIonChange={(e) => setCity(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>State</IonLabel>
                  <IonInput value={state} onIonChange={(e) => setState(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Zip</IonLabel>
                  <IonInput value={zip} onIonChange={(e) => setZip(e.detail.value!)} />
                </IonItem>
                <IonButton expand="full" onClick={handleCandidateRegister}>Register</IonButton>
                <IonButton fill="outline" expand="full" onClick={() => setShowCandidateSignUp(false)}>Go Back</IonButton>
              </IonCardContent>
            </IonCard>
          ) : (
            <IonCard>
              <IonCardHeader>Panelist Registration</IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonLabel position='stacked'>Name</IonLabel>
                  <IonInput value={panelistName} onIonChange={(e) => setPanelistName(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Email</IonLabel>
                  <IonInput value={panelistEmail} onIonChange={(e) => setPanelistEmail(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Password</IonLabel>
                  <IonInput type="password" value={panelistPassword} onIonChange={(e) => setPanelistPassword(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked'>Expertise</IonLabel>
                  <IonInput value={expertise} onIonChange={(e) => setExpertise(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel>Select Interview</IonLabel>
                  <select
                    className="form-select"
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
                </IonItem>
                <IonButton expand="full" onClick={handlePanelistSubmit}>Register</IonButton>
                <IonButton fill="outline" expand="full" onClick={() => setShowPanelistSignUp(false)}>Go Back</IonButton>
                </IonCardContent>
                </IonCard>)
                )}
                </IonContent>
                <Footer/>
                </IonPage>
                  );
};
                export default HomePage;
