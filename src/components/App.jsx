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

  onAddContact = contactData => {
    const { name, number } = contactData;
    const { contacts } = this.state;
    // перевірка наявності імені і номеру телефону в контактах,з приведенням в нижній регістр(незалежно від того велика чи мала літера буде працювати)
    const isDuplicateName = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );
    // якщо є дублікат видаємо повідомлення і виходимо з функції
    if (isDuplicateName) {
      return Notiflix.Notify.failure(
        `${name} or ${number} is already in contacts!`
      );
    }
    // в іншому випадку розпилюємо попередні контакти і дописуємо новий контакт в кінець масиву
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactData],
    }));
  };
  // переписуємо масив контактів фільтруючи всі контакти id яких не дорівнює обраному id, що передається у функцію з компоненту ContactList
  onRemoveContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
      filter: '',
    });
  };
  //  запис в state.filter значення інпуту filter
  onFilterChange = event => {
    this.setState({
      filter: event.target.value,
    });
  };
  //  если filter пустое, то условие фильтрации не выполняется, и метод filter просто возвращает исходный массив contacts без  изменений.
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
            // передача результату функції filteredContacts
            contacts={this.filteredContacts()}
            // передача посилання на функцію onRemoveContact для отримання id
            onRemoveContact={this.onRemoveContact}
          />
        </div>
      </div>
    );
  }
}
