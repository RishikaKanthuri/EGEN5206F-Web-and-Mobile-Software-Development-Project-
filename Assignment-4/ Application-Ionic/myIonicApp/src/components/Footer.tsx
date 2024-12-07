import { IonFooter, IonToolbar, IonGrid, IonRow, IonCol, IonIcon, IonText, IonTitle } from '@ionic/react';
import { mail, call, location } from 'ionicons/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const Footer: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar style={{backgroundColor: 'rgba(232, 184, 232, 0.3)'}}>
        <IonTitle>Contact Us</IonTitle>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonIcon icon={mail} />
              <IonText>Email: info@example.com</IonText>
            </IonCol>
            <IonCol>
              <IonIcon icon={call} />
              <IonText>Phone: +1 234 567 890</IonText>
            </IonCol>
            <IonCol>
              <IonIcon icon={location} />
              <IonText>Address: 123 Example St, City, Country</IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
