import api from './connexion-api';

export class Dispense {
  // Endpoint de base pour les Dispense
  static endpointDispense = '/Dispense';

  // Fonction pour récupérer toutes les Dispense
  static async getAllDispenses() {
    return api.get(`${this.endpointDispense}/`).then((response) => response.data);
  }

  // Fonction pour récupérer une Dispense par ID
  static async getDispenseById(idDispense) {
    return api.get(`${this.endpointDispense}/${idDispense}`).then((response) => response.data);
  }

  // Fonction pour ajouter une nouvelle Dispense
  static async createDispense(data) {
    return api.post(`${this.endpointDispense}/`, data).then((response) => response.data);
  }

  // Fonction pour mettre à jour une Dispense
  static async updateDispense(idDispense, data) {
    return api.put(`${this.endpointDispense}/${idDispense}`, data).then((response) => response.data);
  }

  // Fonction pour supprimer une Dispense
  static async deleteDispense(idDispense) {
    return api.delete(`${this.endpointDispense}/${idDispense}`).then((response) => response.data);
  }
}
