interface FieldTypeToValueType {
  text: string;
  textarea: string;
  number: number;
  date: Date;
  select: string;
  checkbox: boolean;
  radio: string;
}

interface FieldBase<T extends keyof FieldTypeToValueType> {
  label: string;
  type: T;
  value?: FieldTypeToValueType[T];
}

interface TextField extends FieldBase<"text"> {}

interface TextareaField extends FieldBase<"textarea"> {}

interface NumberField extends FieldBase<"number"> {}

interface CheckboxField extends FieldBase<"checkbox"> {}

interface SelectField extends FieldBase<"select"> {
  options: string[];
}

interface DateField extends FieldBase<"date"> {}

interface RadioField extends FieldBase<"radio"> {}

type FieldType =
  | TextField
  | TextareaField
  | NumberField
  | CheckboxField
  | SelectField
  | DateField
  | RadioField;

type FormFieldDOM = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * This class is used to build a form.
 */
export default class FormBuilder<T extends Record<string, FieldType>> {
  /**
   * The options for the form.
   */
  options: T | null = null;

  /**
   * The callbacks that will be called when the form is submitted.
   */
  submitCallbacks = new Map();

  constructor(private containerId: string, initialData: { fields: T }) {
    this.options = initialData.fields;
    this.render();
  }

  // /**
  //  * Adds a field to the form.
  //  *
  //  * @param type The type of field to add.
  //  * @param options The options for the field. Should contain a `type`, `label`, and optionally `value`.
  //  */
  // addField(slug: string, options: FieldType) {
  //   this.options.set(slug, options);
  //   this.render();
  // }

  // /**
  //  * Removes a field from the form.
  //  *
  //  * @param slug The slug of the field to remove.
  //  */
  // removeField(slug: string) {
  //   this.options.delete(slug);
  //   this.render();
  // }

  /**
   * Gets the value of a field.
   *
   * @param slug The slug of the field to get the value of.
   *
   * @returns The value of the field.
   */
  getFieldValue<K extends keyof T>(
    slug: K
  ): FieldTypeToValueType[T[K]["type"]] | null {
    const field = this.options?.[slug];
    const fieldElement = document.getElementById(
      slug.toString()
    ) as FormFieldDOM | null;

    const rawValue = fieldElement?.value;

    if (!rawValue || !field) {
      return null;
    }

    let value: FieldTypeToValueType[T[K]["type"]];

    value = {
      text: rawValue,
      textarea: rawValue,
      number: +rawValue,
      checkbox: (fieldElement as HTMLInputElement).checked,
      select: rawValue,
      date: new Date(rawValue),
      radio: rawValue,
    }[field.type] as FieldTypeToValueType[T[K]["type"]];

    return value ?? null;
  }

  setFieldValue<K extends keyof T>(
    slug: K,
    value: FieldTypeToValueType[T[K]["type"]]
  ) {
    const fieldElement = document.getElementById(
      slug.toString()
    ) as FormFieldDOM | null;

    if (!fieldElement) {
      return;
    }

    fieldElement.value = value?.toString() || "";
  }

  /**
   * The callback will be called when the form is submitted.
   * It will be called with a map of the values of the form. (key => value)
   */
  onFormSubmit(callback: (fields: Map<keyof T, T[keyof T]["value"]>) => void) {
    let id = 0;

    while (this.submitCallbacks.has(id)) {
      id++;
    }

    this.submitCallbacks.set(id, callback);

    return {
      unsubscribe: () => {
        this.submitCallbacks.delete(id);
      },
    };
  }

  triggerFormSubmit() {
    const values = new Map<keyof T, T[keyof T]["value"] | null>();

    Object.keys(this.options || {}).forEach((slug) => {
      values.set(slug, this.getFieldValue(slug));
    });

    // for (const [slug, field] of this.options) {
    //   values.set(slug, this.getFieldValue(slug));
    // }

    for (const [_, callback] of this.submitCallbacks) {
      callback(values);
    }
  }

  private instanciateField(slug: keyof T, field: FieldType) {
    const fieldType = field.type;

    let fieldElement;
    switch (fieldType) {
      case "text":
        fieldElement = document.createElement("input");
        fieldElement.type = "text";
        break;

      case "textarea":
        fieldElement = document.createElement("textarea");
        break;

      case "number":
        fieldElement = document.createElement("input");
        fieldElement.type = "number";
        break;

      case "checkbox":
        fieldElement = document.createElement("input");
        fieldElement.type = "checkbox";
        break;

      case "select":
        fieldElement = document.createElement("select");
        const options = field.options;
        // Adding the options to the select
        for (const option of options) {
          const optionElement = document.createElement("option");
          optionElement.value = option;
          optionElement.innerHTML = option;
          fieldElement.appendChild(optionElement);
        }
        break;

      case "date":
        fieldElement = document.createElement("input");
        fieldElement.type = "date";
        break;

      case "radio":
        fieldElement = document.createElement("input");
        fieldElement.type = "radio";
        break;
    }

    fieldElement.id = slug.toString();

    if (field.value) {
      fieldElement.value = field.value.toString();
    }

    return fieldElement;
  }

  /**
   * This builds the form on the page
   */
  render() {
    const container = document.getElementById(this.containerId);
    container!.innerHTML = "";

    Object.keys(this.options || {}).forEach((key) => {
      const field = this.options?.[key];

      if (!field) {
        return;
      }

      const fieldElement = this.instanciateField(key, field);

      // Adding the label
      const label = document.createElement("label");
      label.innerHTML = field.label;
      label.setAttribute("for", key);

      const fieldContainer = document.createElement("div");

      // Adding the field
      fieldContainer.appendChild(label);
      fieldContainer.appendChild(fieldElement!);

      container!.appendChild(fieldContainer);
    });

    // Adding the submit button
    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    submitButton.addEventListener("click", () => {
      this.triggerFormSubmit();
    });
    container!.appendChild(submitButton);
  }
}
