import { bdFirestore } from "./init";
import { getDocs, query, orderBy, collection, addDoc, Timestamp, getDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

export async function creer(uid, idDossier, url){
    // Référence au document dans laquelle on veut ajouter le dossier
    let doc = doc(bdFirestore, 'signets', uid, 'dossiers', idDossier);
    // Ajout du dossier avec addDoc : retourne une promesse contenant une 
    // "référence" Firestore au document ajouté
    let refDoc = await addDoc(coll, dossier);
    // On utilise la référence pour obtenir l'objet représentant le document
    // ajouté grâce à la fonction getDoc (au singulier !) : cette fonction retourne
    // une promesse, d'où l'utilisation de 'await'...
    return await getDoc(refDoc);
}