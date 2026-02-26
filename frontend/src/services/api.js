const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth headers
  getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    // Remove Content-Type for file uploads
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
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

  async addTaskMember(taskId, userId) {
    return this.request(`/tasks/${taskId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId })
    });
  }

  async getTaskMembers(taskId) {
    return this.request(`/tasks/${taskId}/members`);
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
      body: JSON.stringify(userData)
    });
  }

  async updatePassword(passwordData) {
    return this.request('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData)
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

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Admin User Management methods
  async getAllUsers(search = '') {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return this.request(`/users${query}`);
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async updateUser(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  async deleteUser(userId) {
    return this.request(`/users/${userId}`, {
      method: 'DELETE'
    });
  }

  // Permission methods
  async getAvailablePermissions() {
    return this.request('/users/permissions/all');
  }

  async getUserPermissions(userId) {
    return this.request(`/users/${userId}/permissions`);
  }

  async updateUserPermissions(userId, permissionIds) {
    return this.request(`/users/${userId}/permissions`, {
      method: 'POST',
      body: JSON.stringify({ permissionIds })
    });
  }

  // Board methods
  async getBoards() {
    return this.request('/boards');
  }

  async createBoard(boardData) {
    return this.request('/boards', {
      method: 'POST',
      body: JSON.stringify(boardData)
    });
  }

  async updateBoard(id, boardData) {
    return this.request(`/boards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(boardData)
    });
  }

  async deleteBoard(id) {
    return this.request(`/boards/${id}`, {
      method: 'DELETE'
    });
  }

  async getBoardMembers(boardId) {
    return this.request(`/boards/${boardId}/members`);
  }

  async addMemberToBoard(boardId, userId) {
    return this.request(`/boards/${boardId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId })
    });
  }

  async removeMemberFromBoard(boardId, userId) {
    return this.request(`/boards/${boardId}/members/${userId}`, {
      method: 'DELETE'
    });
  }

  // Team methods
  async getTeams() {
    return this.request('/teams');
  }

  async createTeam(teamData) {
    return this.request('/teams', {
      method: 'POST',
      body: JSON.stringify(teamData)
    });
  }

  async getTeamMembers(teamId) {
    return this.request(`/teams/${teamId}/members`);
  }

  async addMemberToTeam(teamId, userId) {
    return this.request(`/teams/${teamId}/members`, {
      method: 'POST',
      body: JSON.stringify({ userId })
    });
  }

  async removeMemberFromTeam(teamId, userId) {
    return this.request(`/teams/${teamId}/members/${userId}`, {
      method: 'DELETE'
    });
  }

  async deleteTeam(id) {
    return this.request(`/teams/${id}`, {
      method: 'DELETE'
    });
  }

  // Invite methods
  async sendTeamInvite(equipa_id, utilizador_id) {
    return this.request('/invites/send', {
      method: 'POST',
      body: JSON.stringify({ equipa_id, utilizador_id })
    });
  }

  async getMyInvites() {
    return this.request('/invites/my');
  }

  async respondToInvite(inviteId, accept) {
    return this.request('/invites/respond', {
      method: 'POST',
      body: JSON.stringify({ inviteId, accept })
    });
  }

  // Notification methods
  async getMyNotifications() {
    return this.request('/notifications');
  }

  async markNotificationAsRead(id) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT'
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/read-all', {
      method: 'PUT'
    });
  }

  async deleteNotification(id) {
    return this.request(`/notifications/${id}`, {
      method: 'DELETE'
    });
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
