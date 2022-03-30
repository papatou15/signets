import { bdFirestore } from "./init";
import { getDocs, collection } from "firebase/firestore";

/**
 * Obtenir les dossiers d'un utilisateur
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecté
 * @returns {Promise<any[]>} Promesse avec le tableau des dossiers lorsque complété
 */
export async function lireTout(idUtilisateur){
    getDocs(collection(bdFirestore, 'signets', idUtilisateur, 'dossiers')).then(
        res => res.docs.map(doc => ({id: doc.id, ...doc.data()}))
    );
}