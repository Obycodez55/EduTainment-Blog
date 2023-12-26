module.exports = function getTags(obj) {
  const unwantedField = ["body", "title", "description", "image"];
  var property = [];
  for (const prop in obj) {
    if (unwantedField.includes(prop)) {
      continue;
    }
    if (obj.hasOwnProperty(prop) && obj[prop] === "on") {
      property.unshift(prop);
    }
  }
  return property; // Return null if the value is not found in any property
};
