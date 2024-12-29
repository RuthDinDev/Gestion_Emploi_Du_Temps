import api from './connexion-api';

export class Enseignant {
  // Base endpoint pour les enseignants
  static endpointEnseignant = '/enseignant';

  // Récupérer tous les enseignants
  static async getAllEnseignants() {
    return api.get(`${this.endpointEnseignant}/`).then((response) => response.data);
  }

  static async getEnseignantById(id) {
    return api.get(`${this.endpointEnseignant}/${id}`).then((response) => response.data);
  }

  static async createEnseignant(data) {
    return api.post(`${this.endpointEnseignant}/`, data).then((response) => response.data);
  }

  static async updateEnseignant(id, data) {
    return api.put(`${this.endpointEnseignant}/${id}`, data).then((response) => response.data);
  }

  static async deleteEnseignant(id) {
    return api.delete(`${this.endpointEnseignant}/${id}`).then((response) => response.data);
  }
}
