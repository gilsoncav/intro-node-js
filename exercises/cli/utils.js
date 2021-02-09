const fs = require("fs");
const path = require("path");

// this path needs to be relative to work with fs
const contactsLocation = "contacts.json";

/**
 * should read the contacts at the
 * @contactsLocation path and convert
 * it to a js object
 */
const getContacts = () => {
  const rawFile = fs.readFileSync(path.join(__dirname, contactsLocation));
  const contactsFromFile = JSON.parse(rawFile);

  return contactsFromFile;
};

/**
 * takes a contacts object, converts it to JSON
 * and saves it at the @contactsLocation path
 * @param {Object} contacts contacts object
 */
const saveContacts = (contacts) => {
  try {
    const contactsToJSON = JSON.stringify(contacts);
    const filePath = path.join(__dirname, contactsLocation);

    fs.writeFileSync(filePath, contactsToJSON);
  } catch (e) {
    console.error(`[ERROR] trying to write in the file ${filePath}`, e);
  }
};

module.exports = {
  contactsLocation,
  getContacts,
  saveContacts,
};
