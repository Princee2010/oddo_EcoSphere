// Single source of truth for every simple CRUD resource. Adding a field here
// automatically shows up in the table AND the add/edit form — no need to
// touch the generic page or table component.

export const resourceConfigs = {
  carbon: {
    title: "Carbon Emissions",
    endpoint: "/carbon",
    columns: [
      { key: "source", label: "Source" },
      { key: "activityValue", label: "Activity Value" },
      { key: "unit", label: "Unit" },
      { key: "co2Equivalent", label: "CO2e (kg)" },
      { key: "date", label: "Date", type: "date" },
    ],
    formFields: [
      { key: "source", label: "Source", type: "text", required: true },
      { key: "activityValue", label: "Activity Value", type: "number", required: true },
      { key: "unit", label: "Unit", type: "text", required: true },
      { key: "co2Equivalent", label: "CO2 Equivalent (kg)", type: "number", required: true },
      { key: "date", label: "Date", type: "date" },
      { key: "notes", label: "Notes", type: "text" },
    ],
  },
  energy: {
    title: "Energy Consumption",
    endpoint: "/energy",
    columns: [
      { key: "source", label: "Source" },
      { key: "consumption", label: "Consumption" },
      { key: "unit", label: "Unit" },
      { key: "cost", label: "Cost" },
      { key: "date", label: "Date", type: "date" },
    ],
    formFields: [
      { key: "source", label: "Source", type: "text", required: true },
      { key: "consumption", label: "Consumption", type: "number", required: true },
      { key: "unit", label: "Unit", type: "text" },
      { key: "cost", label: "Cost", type: "number" },
      { key: "date", label: "Date", type: "date" },
      { key: "notes", label: "Notes", type: "text" },
    ],
  },
  water: {
    title: "Water Consumption",
    endpoint: "/water",
    columns: [
      { key: "source", label: "Source" },
      { key: "consumption", label: "Consumption" },
      { key: "unit", label: "Unit" },
      { key: "cost", label: "Cost" },
      { key: "date", label: "Date", type: "date" },
    ],
    formFields: [
      { key: "source", label: "Source", type: "text", required: true },
      { key: "consumption", label: "Consumption", type: "number", required: true },
      { key: "unit", label: "Unit", type: "text" },
      { key: "cost", label: "Cost", type: "number" },
      { key: "date", label: "Date", type: "date" },
      { key: "notes", label: "Notes", type: "text" },
    ],
  },
  waste: {
    title: "Waste Management",
    endpoint: "/waste",
    columns: [
      { key: "type", label: "Type" },
      { key: "quantity", label: "Quantity" },
      { key: "unit", label: "Unit" },
      { key: "date", label: "Date", type: "date" },
    ],
    formFields: [
      { key: "type", label: "Type", type: "text", required: true },
      { key: "quantity", label: "Quantity", type: "number", required: true },
      { key: "unit", label: "Unit", type: "text" },
      { key: "date", label: "Date", type: "date" },
      { key: "notes", label: "Notes", type: "text" },
    ],
  },
  suppliers: {
    title: "Suppliers",
    endpoint: "/suppliers",
    columns: [
      { key: "name", label: "Name" },
      { key: "category", label: "Category" },
      { key: "country", label: "Country" },
      { key: "esgScore", label: "ESG Score" },
      { key: "status", label: "Status" },
    ],
    formFields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "category", label: "Category", type: "text" },
      { key: "country", label: "Country", type: "text" },
      { key: "contactEmail", label: "Contact Email", type: "text" },
      { key: "esgScore", label: "ESG Score (0-100)", type: "number" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["active", "inactive", "under_review"],
      },
    ],
  },
  goals: {
    title: "ESG Goals",
    endpoint: "/goals",
    columns: [
      { key: "pillar", label: "Pillar" },
      { key: "title", label: "Title" },
      { key: "targetValue", label: "Target" },
      { key: "currentValue", label: "Current" },
      { key: "status", label: "Status" },
    ],
    formFields: [
      {
        key: "pillar",
        label: "Pillar",
        type: "select",
        options: ["environmental", "social", "governance"],
        required: true,
      },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "targetValue", label: "Target Value", type: "number", required: true },
      { key: "currentValue", label: "Current Value", type: "number" },
      { key: "unit", label: "Unit", type: "text" },
      { key: "deadline", label: "Deadline", type: "date" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["in_progress", "completed", "at_risk"],
      },
    ],
  },
};
