// list of meal preferences option
// consider moving this to the db later on

export default {
  dietFilters: {
    type: "radio",
    options: [
      {
        label: "No Diet",
        value: "No Diet",
        definition: "",
        selected: true
      },
      {
        label: "Paleo",
        value: "paleo",
        definition:
          "Foods that in the past could be obtained by hunting and gathering",
        selected: false
      },
      {
        label: "Vegetarian",
        value: "vegetarian",
        definition:
          "No ingredients may contain meat or meat by-products, such as bones or gelatin",
        selected: false
      },
      {
        label: "Vegan",
        value: "vegan",
        definition: "No meat, poultry, fish, dairy, eggs or honey",
        selected: false
      },
      {
        label: "Ketogenic",
        value: "ketogenic",
        subtext: "",
        definition: "Less than 10 grams of carbs per serving",
        selected: false
      },
      {
        label: "Pescatarian",
        value: "pescatarian",
        subtext: "",
        definition: "Fish and Seafood",
        selected: false
      },
      {
        label: "Whole30",
        value: "whole 30",
        subtext: 174,
        definition: "Follows the program rule",
        selected: false
      }
    ]
  },
  moreFilters: {
    type: "checkbox",
    options: [
      {
        label: "Gluten",
        value: "gluten",
        subtext: "*",
        definition: "",
        selected: false
      },
      {
        label: "Peanut",
        value: "peanut",
        definition: "",
        selected: false
      },
      {
        label: "Tree nuts",
        value: "tree nut",
        definition: "",
        selected: false
      },
      {
        label: "Dairy",
        value: "dairy",
        definition: "",
        selected: false
      },
      {
        label: "Shellfish",
        value: "shellfish",
        definition: "Does not contain pork or derivatives ",
        selected: false
      },
      {
        label: "Eggs",
        value: "egg",
        definition: "Does not contain pork or derivatives ",
        selected: false
      }
    ]
  },
  dishCountFilters: {
    type: "radio",
    options: [
      {
        label: "2",
        value: "2",
        definition: "",
        selected: false
      },
      {
        label: "3",
        value: "3",
        definition: "",
        selected: false
      },
      {
        label: "4",
        value: "4",
        definition: "",
        selected: false
      },
      {
        label: "5",
        value: "5",
        definition: "",
        selected: false
      },
      {
        label: "6",
        value: "6",
        definition: "",
        selected: true
      },
      {
        label: "7",
        value: "7",
        definition: "",
        selected: false
      }
    ]
  },
  servingsFilters: {
    type: "radio",
    options: [
      {
        label: "2",
        value: "2",
        definition: "",
        selected: false
      },
      {
        label: "4",
        value: "4",
        definition: "",
        selected: false
      },
      {
        label: "6",
        value: "6",
        definition: "",
        selected: false
      }
    ]
  },
  timeFilters: {
    type: "radio",
    options: [
      {
        label: "Less than 20 mins",
        value: "20",
        definition: "",
        selected: false
      },
      {
        label: "Less than 40 mins",
        value: "40",
        definition: "",
        selected: false
      },
      {
        label: "It doesn't matter",
        value: "",
        definition: "",
        selected: false
      }
    ]
  }
};
