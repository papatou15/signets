import './Accueil.scss';
import logoGoogle from '../images/google-logo.png';
import { authFirebase, authGoogle } from '../code/init';
import { signInWithPopup } from 'firebase/auth';

export default function Accueil() {
  function connexion(){
    signInWithPopup(authFirebase, authGoogle)
  }

  return (
    <div className="Accueil">
      <h3 className="logo">Signets</h3>
      <div className="conteneur-boutons-connexion">
        <span className="btn-google" onClick={connexion}>
          <img className="btn-image" src={logoGoogle} alt="Logo Google"/>
          <span className="btn-texte">Continuer avec Google</span>
        </span>
      </div>
    </div>
  )
}