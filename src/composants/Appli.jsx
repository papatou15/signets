import './Appli.scss';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import Accueil from './Accueil';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authFirebase } from '../code/init';

export default function Appli() {
  // État 'utilisateur'
  const [utilisateur, setUtilisateur] = useState(null);

  //Surveiller l'état de la connexion FirebaseAuth

  useEffect(
    () => onAuthStateChanged(authFirebase, (user) => setUtilisateur(user)),
    []
  );

  return (
      utilisateur ?
        <div className="Appli">
            <Entete utilisateur={utilisateur}/>
            <section className="contenu-principal">
              <ListeDossiers />
              <Fab size="large" className="ajoutRessource" color="primary" aria-label="Ajouter dossier">
                <AddIcon />
              </Fab>
            </section>
        </div>
      :
        <Accueil />
  
  );
}
