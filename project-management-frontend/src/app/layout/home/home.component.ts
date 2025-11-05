import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="home-container">
      <h1>Welcome to Project Management System, Project for APPLICATION DEVELOPMENT 2.</h1>
      <section class="project-info">
        <h2>About This Project</h2>
        <p>
          This system demonstrates project management functionality, including managing
          employees, projects, and tasks. It is developed as part of the Application
          Development 2 course requirements.
        </p>
        <p class="subtitle">
          This Angular frontend replaces the FreeMarker templates with a modern,
          reactive single-page application architecture.
        </p>
      </section>
    </div>
  `,
  styles: []
})
export class HomeComponent {}
