import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface ActionMenuItem {
  label: string;
  icon: string;
  action?: () => void;
  route?: string;
  danger?: boolean;
  divider?: boolean;
}

@Component({
  selector: 'app-action-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="action-menu">
      <button
        type="button"
        class="action-trigger"
        (click)="toggleMenu()"
        aria-label="Actions">
        <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
      </button>
      <div class="dropdown-menu" [class.show]="isOpen">
        @for (item of items; track item.label) {
          @if (item.divider) {
            <hr />
          } @else {
            @if (item.route) {
              <a
                [routerLink]="item.route"
                class="dropdown-item"
                [class.danger]="item.danger"
                (click)="closeMenu()">
                <i [class]="item.icon"></i>{{ item.label }}
              </a>
            } @else {
              <a
                href="#"
                class="dropdown-item"
                [class.danger]="item.danger"
                (click)="handleAction($event, item)">
                <i [class]="item.icon"></i>{{ item.label }}
              </a>
            }
          }
        }
      </div>
    </div>
  `,
  styles: []
})
export class ActionMenuComponent {
  @Input() items: ActionMenuItem[] = [];
  @Output() itemClicked = new EventEmitter<ActionMenuItem>();
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }

  handleAction(event: Event, item: ActionMenuItem) {
    event.preventDefault();
    this.closeMenu();
    if (item.action) {
      item.action();
    }
    this.itemClicked.emit(item);
  }
}
