assignEmployees(taskId: number, employeeIds: number[]): Observable {
  let params = new HttpParams();
  employeeIds.forEach(id => params = params.append('employeeIds', id.toString()));
  return this.http.post(`${this.apiUrl}/${taskId}/assignEmployees`, null, { params });
}
