import { Component, input } from "@angular/core";
import { Field, FormField } from "@angular/forms/signals";

@Component({
    selector: 'input-text',
    imports: [FormField],
    template: `
      <div class="flex flex-row flex-wrap">
        <label [for]="id()" class="w-full md:w-1/4">{{ label() }}</label>
        <input
          type="text"
          [id]="id()"
          [formField]="field()"
          class="w-full md:w-3/4 rounded-xs border border-gray-300 bg-white px-2 py-1 autofill:[-webkit-text-fill-color:theme(colors.gray.900)]"
        >
      </div>
    `,
  })
  export class InputText {
    field = input.required<Field<string>>();
    label = input.required<string>();
    id = input.required<string>();
  }
