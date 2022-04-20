import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TwitterPicker } from 'react-color';
import { useState } from 'react';

export default function ModificationDossier({id, titre_p, couleur_p, couverture_p, ouvert, setOuvert, gererModifierDossier}) {
  const [titre, setTitre] = useState(titre_p);
  const [couverture, setCouverture] = useState(couverture_p);
  const [couleur, setCouleur] = useState(couleur_p);

  const gererOuvrir = () => {
    setOuvert(true);
  };

  const gererFermer = () => {
    // setTitre('');
    // setCouverture('');
    // setCouleur('#000');
    setOuvert(false);
  };

  function gererSoumettre(){
  // Gère l'ajout dans Firestore
    if(titre.search(/[a-z]{2,}/i) != -1) {
      gererModifierDossier(id, titre, couverture, couleur);
      gererFermer();
  }}

  return (
    <div>
      <Dialog open={ouvert} onClose={gererFermer}>
        <DialogTitle>Modifier ce dossier</DialogTitle>
        <DialogContent>
            {/* Titre du dossier */}
            <TextField
                autoFocus
                margin="dense"
                id="titre"
                label="Titre du dossier"
                type="text"
                fullWidth
                variant="standard"
                onChange={e => setTitre(e.target.value)}
                defaultValue={titre_p}
            />
          {/* URL de l'image */}
            <TextField
                autoFocus
                margin="dense"
                id="couverture"
                label="Image de couverture du dossier"
                type="url"
                fullWidth
                variant="standard"
                style={{marginBottom: "1.5rem"}}
                onChange={e => setCouverture(e.target.value)}
                defaultValue={couverture_p}
            />
            {/* Ajout du choix de couleur */}
            <TwitterPicker
                triangle='hide'
                color={couleur}
                colors={["#900", "#090", "#009", "orange"]}
                width="auto"
                onChangeComplete={(couleur, e) => setCouleur(couleur.hex)}
                defaultValue={couleur_p}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={gererFermer}>Annuler</Button>
          <Button onClick={gererSoumettre}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
