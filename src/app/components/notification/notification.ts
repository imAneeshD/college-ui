import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ToastType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="toast"
      [class.show]="show"
      [class.success]="type === 'success'"
      [class.error]="type === 'error'"
      [class.info]="type === 'info'"
      role="status"
      aria-live="polite"
    >
      <div class="bar"></div>
      <div class="content">{{ message }}</div>
    </div>
  `,
  styleUrls: ['./notification.scss']
})
export class Notification {
  @Input() message = '';
  @Input() show = false;
  @Input() type: ToastType = 'success';
}
