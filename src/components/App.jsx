import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import React from 'react';
import Notiflix from 'notiflix';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const stringifContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(stringifContacts) ?? [];

    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const stringifContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifContacts);
    }
  }

  onAddContact = contactData => {
    const { name, number } = contactData;
    const { contacts } = this.state;

    const isDuplicateName = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (isDuplicateName) {
      return Notiflix.Notify.failure(
        `${name} or ${number} is already in contacts!`
      );
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactData],
    }));
  };

  onRemoveContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
      filter: '',
    });
  };

  onFilterChange = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 25,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30,
        }}
      >
        <div>
          <h1>Phonebook</h1>
          <ContactForm onAddContact={this.onAddContact} />
          <h2>Contacts</h2>
          <Filter
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
          />
          <ContactList
            contacts={this.filteredContacts()}
            onRemoveContact={this.onRemoveContact}
          />
        </div>
      </div>
    );
  }
}
