const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
    // ...твой код
    try {
        const contactsList = JSON.parse(await fs.readFile(contactsPath));

        return contactsList;
    } catch (error) {
        return error.message;
    }
}

async function getContactById(contactId) {
  // ...твой код
    const contactsList = await listContacts();
    const searchedContact = contactsList.find(contact => contact.id === `${contactId}`.toString());
    
    if (!searchedContact) {
        return null;
    }

    return searchedContact;
}

async function removeContact(contactId) {
  // ...твой код
    const contactsList = await listContacts();
    const indexOfContact = contactsList.findIndex(contact => contact.id === contactId.toString());
    
    console.log("Removing contact:");
    console.table(contactsList[indexOfContact]);

    contactsList.splice(indexOfContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    
    return contactsList;
}

async function addContact(name, email, phone) {
  // ...твой код
    const contactsList = await listContacts();
    const newContact = {id: nanoid(), name, email, phone };
    
    contactsList.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    
    return contactsList;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}