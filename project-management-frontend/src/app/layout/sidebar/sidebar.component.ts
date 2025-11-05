import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <h2>Project Dashboard</h2>
      <nav>
        <button type="button" routerLink="/employees" routerLinkActive="active">
          Employees
        </button>
        <button type="button" routerLink="/projects" routerLinkActive="active">
          Projects
        </button>
        <button type="button" routerLink="/tasks" routerLinkActive="active">
          Tasks
        </button>
      </nav>
    </aside>
  `,
  styles: []
})
export class SidebarComponent {}
