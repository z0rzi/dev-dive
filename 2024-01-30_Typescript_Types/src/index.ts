import FormBuilder from "./FormBuilder";

// waiting until document is loaded
document.addEventListener("DOMContentLoaded", () => {
  const builder = new FormBuilder("form-container", {
    fields: {
      name: {
        type: "text",
        label: "Name",
      },
      age: {
        type: "number",
        label: "Age",
        value: 18,
      },
      email: {
        type: "text",
        label: "Email",
      },
      "date-of-birth": {
        type: "date",
        label: "Date of Birth",
      },
    },
  });

  const d = builder.getFieldValue("date-of-birth");

  builder.onFormSubmit((fields) => {
    console.log(fields);
  });

  setTimeout(() => {
    builder.triggerFormSubmit();
  }, 1000);
});
