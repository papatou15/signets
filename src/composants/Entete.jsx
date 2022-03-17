import './Entete.scss';
import Avatar from '@mui/material/Avatar';
import {authFirebase} from '../code/init';

export default function Entete({utilisateur}) {

  function deconnexion(){
    authFirebase.signOut()
  }

  return (
    <header className="Entete">
      <div className="logo">Signets</div>
      <nav>
        <div className="utilisateur">
          {utilisateur.displayName}
          <Avatar className="avatar" alt={utilisateur.displayName} src={utilisateur.photoURL} />
        </div>
        <div className="btn-deconnexion" onClick={deconnexion}>Déconnexion</div>
      </nav>
    </header>
  );
}