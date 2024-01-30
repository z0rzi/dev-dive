/**
 * This class is used to build a form.
 */
export default class FormBuilder {
  /**
   * The options for the form.
   */
  options = new Map();

  /**
   * The callbacks that will be called when the form is submitted.
   */
  submitCallbacks = new Map();

  constructor(private containerId: any) {}

  /**
   * Adds a field to the form.
   *
   * @param type The type of field to add.
   * @param options The options for the field. Should contain a `type`, `label`, and optionally `value`.
   */
  addField(slug: any, options: any) {
    this.options.set(slug, options);
    this.render();
  }

  /**
   * Removes a field from the form.
   *
   * @param slug The slug of the field to remove.
   */
  removeField(slug: any) {
    this.options.delete(slug);
    this.render();
  }

  /**
   * Gets the value of a field.
   *
   * @param slug The slug of the field to get the value of.
   *
   * @returns The value of the field.
   */
  getFieldValue(slug: any) {
    const field = this.options.get(slug);
    const fieldElement = document.getElementById(slug) as any;

    const rawValue = fieldElement?.value;

    if (!rawValue) {
      return null;
    }

    let value;

    switch (field.type) {
      case "text":
        value = rawValue;
        break;
      case "textarea":
        value = rawValue;
        break;
      case "number":
        value = +rawValue;
        break;
      case "checkbox":
        value = fieldElement!.checked;
        break;
      case "select":
        value = rawValue;
        break;
      case "date":
        value = new Date(rawValue);
        break;
      case "radio":
        value = rawValue;
        break;
    }

    return value;
  }

  setFieldValue(slug: any, value: any) {
    const fieldElement = document.getElementById(slug) as any;
    fieldElement!.value = value;
  }

  /**
   * The callback will be called when the form is submitted.
   * It will be called with a map of the values of the form. (key => value)
   */
  onFormSubmit(callback: any) {
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
    const values = new Map();

    for (const [slug, field] of this.options) {
      values.set(slug, this.getFieldValue(slug));
    }

    for (const [_, callback] of this.submitCallbacks) {
      callback(values);
    }
  }

  private instanciateField(slug: any, field: any) {
    const fieldType = field.type;

    let fieldElement;
    switch (fieldType) {
      case "text":
        fieldElement = document.createElement("input");
        fieldElement.type = "text";
        break;

      case "textarea":
        fieldElement = document.createElement("input");
        fieldElement.type = "textarea";
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

    fieldElement!.id = slug;

    if (field.value) {
      fieldElement!.value = field.value;
    }

    return fieldElement;
  }

  /**
   * This builds the form on the page
   */
  render() {
    const container = document.getElementById(this.containerId);
    container!.innerHTML = "";

    for (const [key, field] of this.options) {
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
    }

    // Adding the submit button
    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    submitButton.addEventListener("click", () => {
      this.triggerFormSubmit();
    });
    container!.appendChild(submitButton);
  }
}
