import api from './connexion-api';

export class UE {
  // Endpoint de base pour les UEs
  static endpointUE = '/UE';

  // Fonction pour récupérer toutes les UEs
  static async getAllUEs() {
    return api.get(`${this.endpointUE}/`).then((response) => response.data);
  }

  // Fonction pour récupérer une UE par ID
  static async getUEById(idUE) {
    return api.get(`${this.endpointUE}/${idUE}`).then((response) => response.data);
  }

  // Fonction pour ajouter une nouvelle UE
  static async createUE(data) {
    return api.post(`${this.endpointUE}/`, data).then((response) => response.data);
  }

  // Fonction pour mettre à jour une UE
  static async updateUE(idUE, data) {
    return api.put(`${this.endpointUE}/${idUE}`, data).then((response) => response.data);
  }

  // Fonction pour supprimer une UE
  static async deleteUE(idUE) {
    return api.delete(`${this.endpointUE}/${idUE}`).then((response) => response.data);
  }
}
