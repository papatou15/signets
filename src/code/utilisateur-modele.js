import { authFirebase, authGoogle } from './init';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { bdFirestore } from './init';
import { doc, setDoc } from '@firebase/firestore';

/**
 * Ouvre une connexion Firebase avec Google
 */

export function connexion(){
    signInWithPopup(authFirebase, authGoogle)
}

/**
 * Ferme la connexion Firebase Auth
 */


export function deconnexion(){
    authFirebase.signOut()
}

export function observerEtatConnexion(mutateurEtatUtilisateur){
    onAuthStateChanged(authFirebase, 
        user => {
            if (user) {
                setDoc(doc(bdFirestore, 'signets', user.uid), {nom: user.displayName, email: user.email}, {merge: true});
            }
            mutateurEtatUtilisateur(user)
        }
    )
}