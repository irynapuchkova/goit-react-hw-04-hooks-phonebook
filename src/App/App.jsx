import "normalize.css";
import "index.css";

import shortid from "shortid";

import { useState, useEffect } from "react";

import { Container, Heading, Title } from "./App.styled";
import ContactForm from "Components/ContactForm/ContactForm";
import Filter from "Components/Filter/Filter";
import ContactsList from "Components/ContactsList/ContactsList";

function useLocalStarage(key, defaultValue) {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function App() {
  const [contacts, setContacts] = useLocalStarage("contacts", []);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (name, number) => {
    const contactsNames = contacts.map((contact) => contact.name);

    if (contactsNames.includes(name)) {
      alert(`${name} is already in Phonebook`);
    } else {
      const contactToAdd = {
        id: shortid.generate(),
        name,
        number,
      };

      setContacts((contacts) => [contactToAdd, ...contacts]);
    }
  };

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <Heading>PhoneBook</Heading>

      <ContactForm onSubmitForm={handleSubmit} />

      <Title type="text">Contacts</Title>
      <Filter
        type="text"
        value={filter}
        onChange={(e) => handleFilter(e.target.value)}
      />
      {contacts !== [] && (
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      )}
    </Container>
  );
}

export default App;
