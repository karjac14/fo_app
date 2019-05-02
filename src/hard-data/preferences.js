
// list of meal preferences option
// consider moving this to the db later on

export default {
  dietFilters: {
    type: "radio",
    options: [{
      label: "Balanced",
      value: "balanced",
      definition: "Protein/Fat/Carb values in 15/35/50 ratio",
      selected: false
    }, {
      label: "Low-fat",
      value: "low-fat",
      definition: "Less than 15% of total calories from fat",
      selected: false
    }, {
      label: "Low-carbs",
      value: "low-carb",
      definition: "Less than 20% of total calories from carbs",
      selected: false
    }, {
      label: "High-protein",
      value: "high-protien",
      definition: "More than 50% of total calories from proteins",
      selected: false
    }, {
      label: "Keto",
      value: "keto",
      subtext: 'new!',
      definition: "Less than 5 grams of carbs per serving",
      selected: false
    }]
  },
  moreFilters: {
    type: "checkbox",
    options: [{
      label: "Gluten-free",
      value: "gluten-free",
      subtext: '*',
      definition: "No known gluten according to celiac.org",
      selected: false
    }, {
      label: "Vegetarian",
      value: "vegetarian",
      definition: "No meat, poultry, or fish ",
      selected: false
    }, {
      label: "Peanut-free",
      value: "peanut-free",
      definition: "No peanuts or products containing peanuts ",
      selected: false
    }, {
      label: "Tree nut-free",
      value: "tree-nut-free",
      definition: "No tree nuts or products containing tree nuts ",
      selected: false
    }, {
      label: "Vegan",
      value: "vegan",
      definition: "No meat, poultry, fish, dairy, eggs or honey",
      selected: false
    }, {
      label: "Alcohol-free",
      value: "alcohol-free",
      definition: "No alcohol used or contained",
      selected: false
    }, {
      label: "Pork-free",
      value: "pork-free",
      definition: "Does not contain pork or derivatives ",
      selected: false
    }]
  },
  dishCountFilters: {
    type: "radio",
    options: [{
      label: "2",
      value: "2",
      definition: "",
      selected: false
    }, {
      label: "3",
      value: "3",
      definition: "",
      selected: false
    }, {
      label: "4",
      value: "4",
      definition: "",
      selected: false
    }, {
      label: "5",
      value: "5",
      definition: "",
      selected: false
    }, {
      label: "6",
      value: "6",
      definition: "",
      selected: false
    }]
  },
  servingsFilters: {
    type: "radio",
    options: [{
      label: "2",
      value: "2",
      definition: "",
      selected: false
    }, {
      label: "4",
      value: "4",
      definition: "",
      selected: false
    }, {
      label: "6",
      value: "6",
      definition: "",
      selected: false
    }]
  },
  timeFilters: {
    type: "radio",
    options: [{
      label: "Less than 20 mins",
      value: "20",
      definition: "",
      selected: false
    }, {
      label: "Less than 40 mins",
      value: "40",
      definition: "",
      selected: false
    }, {
      label: "It doesn't matter",
      value: "",
      definition: "",
      selected: false
    }]
  }
};