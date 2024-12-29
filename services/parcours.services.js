import api from './connexion-api';

export class Parcours {
  // Endpoint de base pour les Parcours
  static endpointParcours = '/Parcours';

  // Fonction pour récupérer toutes les Parcours
  static async getAllParcours() {
    return api.get(`${this.endpointParcours}/`).then((response) => response.data);
  }

  // Fonction pour récupérer une Parcours par ID
  static async getParcoursById(idParcours) {
    return api.get(`${this.endpointParcours}/${idParcours}`).then((response) => response.data);
  }

  // Fonction pour ajouter une nouvelle Parcours
  static async createParcours(data) {
    return api.post(`${this.endpointParcours}/`, data).then((response) => response.data);
  }

  // Fonction pour mettre à jour une Parcours
  static async updateParcours(idParcours, data) {
    return api.put(`${this.endpointParcours}/${idParcours}`, data).then((response) => response.data);
  }

  // Fonction pour supprimer une Parcours
  static async deleteParcours(idParcours) {
    return api.delete(`${this.endpointParcours}/${idParcours}`).then((response) => response.data);
  }
}
