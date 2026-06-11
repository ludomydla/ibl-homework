import { Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';

@Component({
  selector: 'input-checkbox',
  imports: [FormField],
  template: `
    <label class="inline-flex items-center gap-2 cursor-pointer select-none text-sm mr-2">
      <span class="relative inline-flex h-[18px] w-[18px]">
        <input
          type="checkbox"
          [id]="id()"
          [formField]="field()"
          class="peer absolute inset-0 z-10 m-0 cursor-pointer opacity-0"
        />
        <span
          class="h-full w-full rounded-xs border-2 border-gray-500 bg-white
                   peer-checked:border-blue-600 peer-checked:bg-blue-600
                   peer-focus-visible:outline peer-focus-visible:outline-2
                   peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-600"
        ></span>
        <span
          class="absolute inset-0 flex items-center justify-center
                   text-[12px] leading-none text-white opacity-0 peer-checked:opacity-100"
          >✓</span
        >
      </span>
      {{ label() }}
    </label>
  `,
})
export class InputCheckbox {
  field = input.required<Field<boolean>>();
  label = input.required<string>();
  id = input.required<string>();
}
