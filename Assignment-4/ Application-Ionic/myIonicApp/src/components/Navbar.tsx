import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonButton, IonImg } from '@ionic/react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
const Navbar: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar className="custom-toolbar" >
        <IonButtons slot = "start">
        <IonImg src="/photos/logo.jpg" alt="logo" style={{ width: '120px', height: '80px' }}> </IonImg>
        </IonButtons>
         
         <IonButtons slot="end"> 
          <IonMenuButton/>
          
          <IonButton href="/home">Home</IonButton>
          <IonButton href="/interview">View Jobs</IonButton>
          <IonButton href="#candidateLogin">Candidate</IonButton>
          <IonButton href="#panelistLogin">Panelist</IonButton>
          <IonButton href="/admin">Hiring Manager</IonButton>
        </IonButtons >
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
