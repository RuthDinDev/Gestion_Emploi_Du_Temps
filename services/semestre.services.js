import api from './connexion-api';

export class Semestre {
  // Endpoint de base pour les Semestre
  static endpointSemestre = '/Semestre';

  // Fonction pour récupérer toutes les Semestre
  static async getAllSemestres() {
    return api.get(`${this.endpointSemestre}/`).then((response) => response.data);
  }

  // Fonction pour récupérer une Semestre par ID
  static async getSemestreById(idSemestre) {
    return api.get(`${this.endpointSemestre}/${idSemestre}`).then((response) => response.data);
  }

  // Fonction pour ajouter une nouvelle Semestre
  static async createSemestre(data) {
    return api.post(`${this.endpointSemestre}/`, data).then((response) => response.data);
  }

  // Fonction pour mettre à jour une Semestre
  static async updateSemestre(idSemestre, data) {
    return api.put(`${this.endpointSemestre}/${idSemestre}`, data).then((response) => response.data);
  }

  // Fonction pour supprimer une Semestre
  static async deleteSemestre(idSemestre) {
    return api.delete(`${this.endpointSemestre}/${idSemestre}`).then((response) => response.data);
  }
}
