// Fichier CSS
import './Appli.scss';

// Sous-composants
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import Accueil from './Accueil';
import AjoutDossier from './AjoutDossier';

// Composants externes
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

// Fonctionnalités requises
import { useState, useEffect } from 'react';
import { observerEtatConnexion } from '../code/utilisateur-modele';
import * as dossierModele from '../code/dossier-modele'



export default function Appli() {
  // État 'utilisateur'
  const [utilisateur, setUtilisateur] = useState(null);

  // État des 'dossiers' de l'utilisateur connecté
  const [dossiers, setDossiers] = useState([]);

  // État du formulaire d'ajout de dossier
  const [ouvert, setOuvert] = useState(false);

  // Gérer l'ajout d'un dossier
  function gererAjouterDossier(titre, couverture, couleur){
    //Code pour Firestore
    dossierModele.creer(utilisateur.uid, {titre: titre, couverture: couverture, couleur: couleur}).then(doc => setDossiers([{id: doc.id, ...doc.data()}, ...dossiers]));
  }

  //Surveiller l'état de la connexion FirebaseAuth

  useEffect(() => observerEtatConnexion(setUtilisateur), []);

  return (
      utilisateur ?
        <div className="Appli">
            <Entete utilisateur={utilisateur}/>
            <section className="contenu-principal">
              <ListeDossiers utilisateur={utilisateur} dossiers={dossiers} setDossiers={setDossiers} />
              {/* Ajouter un composant FormDialog de MUI*/}
              <AjoutDossier ouvert={ouvert} setOuvert={setOuvert} gererAjouterDossier={gererAjouterDossier}/>
              <Fab onClick={() => setOuvert(true)} size="large" className="ajoutRessource" color="primary" aria-label="Ajouter dossier">
                <AddIcon />
              </Fab>
            </section>
        </div>
      :
        <Accueil />
  
  );
}
