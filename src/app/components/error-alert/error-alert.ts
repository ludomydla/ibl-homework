import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'error-alert',
  template: `
    <div role="alert" class="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
      @if (list(); as items) {
        <ul class="list-disc list-inside">
          @for (item of items; track $index) {
            <li>{{ item }}</li>
          }
        </ul>
      } @else {
        {{ messages() }}
      }
    </div>
  `,
})
export class ErrorAlert {
  messages = input.required<string | string[]>();
  // string[] -> render as <ul>; string -> null, fall through to plain text
  protected readonly list = computed(() => {
    const value = this.messages();
    return Array.isArray(value) ? value : null;
  });
}
