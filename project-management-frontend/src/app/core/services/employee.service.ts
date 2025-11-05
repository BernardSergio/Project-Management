assignTasks(employeeId: number, taskIds: number[]): Observable {
  let params = new HttpParams();
  taskIds.forEach(id => params = params.append('taskIds', id.toString()));
  return this.http.post(`${this.apiUrl}/${employeeId}/assignTasks`, null, { params });
}

assignProjects(employeeId: number, projectIds: number[]): Observable {
  let params = new HttpParams();
  projectIds.forEach(id => params = params.append('projectIds', id.toString()));
  return this.http.post(`${this.apiUrl}/${employeeId}/assignProjects`, null, { params });
}

getAvailableTasksForEmployee(employeeId: number): Observable {
  return this.http.get(`${this.apiUrl}/${employeeId}/availableTasks`);
}
