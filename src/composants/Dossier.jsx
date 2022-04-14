import { useState } from 'react';
import './Dossier.scss'; 
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import couvertureDefaut from '../images/couverture-defaut.png';
import { formaterDate } from '../code/helper';

export default function Dossier({id, titre, couleur, dateModif, couverture, supprimerDossier}) {

  const [eltAncrage, setEltAncrage] = useState(null);
  const ouvert = Boolean(eltAncrage);

  function gererMenu(event){
    setEltAncrage(event.currentTarget);
  }

  function gererFermer(){
    setEltAncrage(null);
  }
  
  function gererFormulaireModifier(){
    // Ouvrir le formulaire de modification du dossier (transférer l'info dossier dans le formulaire) ...

    // ... puis fermer le menu
    gererFermer();
  }

  function gererSupprimer(){
    // Appeler la fonction de ListeDossiers qui gère la suppression dans Firestore...
    supprimerDossier(id);
    // ...puis fermer le menu
    gererFermer();
  }

  // Tester si l'URL dans la variable couverture est valide
  let urlCouverture;
  try {
    urlCouverture = new URL(couverture);
  }
  catch(e) {
    couverture = couvertureDefaut;
  }
  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir : 
    // https://reactjs.org/docs/dom-elements.html#style
    <article className="Dossier" style={{backgroundColor: couleur}}>
      <div className="couverture">
        <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
          <SortIcon />
        </IconButton>
        <img src={couverture || couvertureDefaut} alt={titre}/>
      </div>
      <div className="info">
        <h2>{titre}</h2>
        <p>Modifié : {formaterDate(dateModif.seconds)}</p>
      </div>
      <IconButton onClick={gererMenu} className="modifier" aria-label="modifier" size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu-contextuel-dossier"
        anchorEl={eltAncrage}
        open={ouvert}
        onClose={gererFermer}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={gererFormulaireModifier}>Modifier</MenuItem>
        <MenuItem onClick={gererSupprimer}>Supprimer</MenuItem>
      </Menu>
    </article>
  );
}
