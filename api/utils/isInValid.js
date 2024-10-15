const reqFields = [
  "recipeName",
  "category",
  "recipeTime",
  "servingSuggestion",
  "ingredients",
  "instructions",
];

// nesnedeki değişkenlerin en az 1 i bile eksikse true
// hepsi tamamsa fakse döndürür
const isInValid = (data) => {
return  reqFields.some((field) => !data[field]);
};

export default isInValid;
