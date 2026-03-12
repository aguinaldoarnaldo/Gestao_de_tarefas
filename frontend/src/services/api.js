export const API_BASE_URL = 'http://localhost:5000/api';
export const BASE_URL = 'http://localhost:5000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Utility to handle image URLs safely
  getImageUrl(path) {
    if (!path) return null;
    if (path.startsWith('http')) return path; // Already a full URL
    // Ensure path doesn't start with / if BASE_URL ends with / or vice-versa
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${BASE_URL}/${cleanPath}`;
  }

  // Get auth headers
  getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token && token !== 'null' && token !== 'undefined') {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.getAuthHeaders();
    
    const config = {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    };

    // Remove Content-Type for file uploads
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    // Timeout of 10 seconds to prevent infinite loading
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
      // Se for 401 (Não autorizado), podemos limpar o token local
      if (response.status === 401 && !url.includes('/auth/login')) {
        sessionStorage.removeItem('token');
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
        throw new Error(error.message || `Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('O servidor demorou muito a responder. Tente novamente.');
      }
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está a correr.');
      }
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Task methods
  async getTasks() {
    return this.request('/tasks');
  }

  async getTasksByBoard(boardId) {
    return this.request(`/tasks/board/${boardId}`);
  }

  async getTaskById(id) {
    return this.request(`/tasks/${id}`);
  }

  async createTask(taskData) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    });
  }

  async updateTask(id, taskData) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData)
    });
  }

  async deleteTask(id) {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE'
    });
  }

  // Attachment methods
  async getTaskAttachments(taskId) {
    return this.request(`/attachments/task/${taskId}`);
  }

  async uploadAttachment(taskId, file) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request(`/attachments/task/${taskId}`, {
      method: 'POST',
      body: formData
    });
  }

  async downloadAttachment(attachmentId) {
    const url = `${this.baseURL}/attachments/${attachmentId}/download`;
    const token = sessionStorage.getItem('token');
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro ao baixar arquivo' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return response.blob();
    } catch (error) {
      console.error('Download Error:', error);
      throw error;
    }
  }

  async deleteAttachment(attachmentId) {
    return this.request(`/attachments/${attachmentId}`, {
      method: 'DELETE'
    });
  }

  // User methods
  async getUserProfile() {
    return this.request('/users/profile');
  }

  async updateUserProfile(userData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: userData instanceof FormData ? userData : JSON.stringify(userData)
    });
  }

  // Auth methods
  async login(email, senha) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha })
    });
  }

  async register(nome, email, senha) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha })
    });
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  async resetPassword(token, newPassword) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword })
    });
  }

  // Board methods
  async getBoards() {
    return this.request('/boards');
  }

  async getBoardById(id) {
    return this.request(`/boards/${id}`);
  }

  async createBoard(boardData) {
    return this.request('/boards', {
      method: 'POST',
      body: boardData instanceof FormData ? boardData : JSON.stringify(boardData)
    });
  }

  async updateBoard(id, boardData) {
    return this.request(`/boards/${id}`, {
      method: 'PUT',
      body: boardData instanceof FormData ? boardData : JSON.stringify(boardData)
    });
  }

  async deleteBoard(id) {
    return this.request(`/boards/${id}`, {
      method: 'DELETE'
    });
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
