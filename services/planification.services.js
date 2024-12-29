import api from './connexion-api';

export class Planification {
  // Endpoint de base pour les Planification
  static endpointPlanification = '/Planification';

  // Fonction pour récupérer toutes les Planification
  static async getAllPlanifications() {
    return api.get(`${this.endpointPlanification}/`).then((response) => response.data);
  }

  // Fonction pour récupérer une Planification par ID
  static async getPlanificationById(idPlanification) {
    return api.get(`${this.endpointPlanification}/${idPlanification}`).then((response) => response.data);
  }

  // Fonction pour ajouter une nouvelle Planification
  static async createPlanification(data) {
    return api.post(`${this.endpointPlanification}/`, data).then((response) => response.data);
  }

  // Fonction pour mettre à jour une Planification
  static async updatePlanification(idPlanification, data) {
    return api.put(`${this.endpointPlanification}/${idPlanification}`, data).then((response) => response.data);
  }

  // Fonction pour supprimer une Planification
  static async deletePlanification(idPlanification) {
    return api.delete(`${this.endpointPlanification}/${idPlanification}`).then((response) => response.data);
  }
}
