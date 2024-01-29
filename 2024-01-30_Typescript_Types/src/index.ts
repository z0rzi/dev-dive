import FormBuilder from "./FormBuilder";

// waiting until document is loaded
document.addEventListener("DOMContentLoaded", () => {
  const builder = new FormBuilder("form-container");

  builder.addField("name", {
    type: "text",
    label: "Name",
  });

  builder.addField("age", {
    type: "number",
    label: "Age",
    value: "18",
  });

  builder.addField("email", {
    type: "text",
    label: "Email",
  });

  builder.addField("date-of-birth", {
    type: "date",
    label: "Date of Birth",
  });

  builder.onFormSubmit((fields: any) => {
    console.log(fields);
  });

  setTimeout(() => {
    builder.triggerFormSubmit();
  }, 1000);
});
