import api from './connexion-api';

export class AnneeAcademique {
  // Endpoint de base pour les AnneeAcademique
  static endpointAnneeAcademique = '/annee-academique';

  // Fonction pour récupérer toutes les AnneeAcademique
  static async getAllAnneesAcademiques() {
    return api.get(`${this.endpointAnneeAcademique}/`).then((response) => response.data);
  }

  // Fonction pour récupérer une AnneeAcademique par ID
  static async getAnneeAcademiqueById(idAnneeAcademique) {
    return api.get(`${this.endpointAnneeAcademique}/${idAnneeAcademique}`).then((response) => response.data);
  }

  // Fonction pour ajouter une nouvelle AnneeAcademique
  static async createAnneeAcademique(data) {
    return api.post(`${this.endpointAnneeAcademique}/`, data).then((response) => response.data);
  }

  // Fonction pour mettre à jour une AnneeAcademique
  static async updateAnneeAcademique(idAnneeAcademique, data) {
    return api.put(`${this.endpointAnneeAcademique}/${idAnneeAcademique}`, data).then((response) => response.data);
  }

  // Fonction pour supprimer une AnneeAcademique
  static async deleteAnneeAcademique(idAnneeAcademique) {
    return api.delete(`${this.endpointAnneeAcademique}/${idAnneeAcademique}`).then((response) => response.data);
  }
}
