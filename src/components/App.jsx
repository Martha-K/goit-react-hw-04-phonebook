import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const deleteContact = e => {
    setContacts(contacts.filter(el => el.name !== e.target.name));
    const contactsArray = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsArray);

    const ArrayAfterDelete = parsedContacts.filter(
      el => el.name !== e.target.name
    );

    localStorage.setItem('contacts', JSON.stringify(ArrayAfterDelete));
  };

  const formSubmitHandle = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    for (const el of contacts) {
      if (el.name.toLowerCase() === contact.name.toLowerCase()) {
        return alert(`${el.name} is already in contacts.`);
      }
    }
    setContacts(prevState => [...prevState, contact]);

    const array = localStorage.getItem('contacts');
    const contactsArray = array ? JSON.parse(array) : [];

    localStorage.setItem(
      'contacts',
      JSON.stringify([...contactsArray, contact])
    );
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const filteredElement = () => {
    const normalizedFilter = filter.toLowerCase();
    return filter
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : contacts;
  };

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandle} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList onClick={deleteContact} contacts={filteredElement} />
    </div>
  );
};
