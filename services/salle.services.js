import api from './connexion-api';

export class Salle {
  // Endpoint de base pour les Salle
  static endpointSalle = '/Salle';

  // Fonction pour récupérer toutes les Salle
  static async getAllSalles() {
    return api.get(`${this.endpointSalle}/`).then((response) => response.data);
  }

  // Fonction pour récupérer une Salle par ID
  static async getSalleById(idSalle) {
    return api.get(`${this.endpointSalle}/${idSalle}`).then((response) => response.data);
  }

  // Fonction pour ajouter une nouvelle Salle
  static async createSalle(data) {
    return api.post(`${this.endpointSalle}/`, data).then((response) => response.data);
  }

  // Fonction pour mettre à jour une Salle
  static async updateSalle(idSalle, data) {
    return api.put(`${this.endpointSalle}/${idSalle}`, data).then((response) => response.data);
  }

  // Fonction pour supprimer une Salle
  static async deleteSalle(idSalle) {
    return api.delete(`${this.endpointSalle}/${idSalle}`).then((response) => response.data);
  }
}
