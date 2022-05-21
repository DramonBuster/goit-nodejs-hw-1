const {
    listContacts,
    getContactById,
    addContact,
    removeContact
} = import('./contacts');
const argv = import('yargs').argv;

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case 'list':
            const contactsList = await listContacts();

          console.table(contactsList);
      break;

      case 'get':
          const searchedContact = getContactById(id);

          if (!searchedContact) {
                throw new Error(`Contact with id=${id} is not found. Try again!`)
            }

          console.table(searchedContact);
      break;

      case 'add':
          // ... name email phone
          const newContact = await addContact(name, email, phone);

          console.table(newContact);
      break;

      case 'remove':
          // ... id
          const contactRemove = await removeContact(id);
          console.log("Current contacts list:");
          console.table(contactRemove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);