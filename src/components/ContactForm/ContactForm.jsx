import React from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export class ContactForm extends React.Component {
  //використовується для збереження даних що змінюються, є тільки в класі. При зміні state відбувається перерендеринг (а також при зміні пропсів)
  state = {
    name: '',
    number: '',
  };

  onChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  }; //передача в значення інпуту в у відповідне поле name бо number  за рахунок динамічного ключа для будь-якого інпута [event.target.name]

  onSubmit = event => {
    event.preventDefault();
    const contactData = {
      name: this.state.name,
      number: this.state.number.replace(/[\s()-]+/g, ''), // вилучення пробілів, тире, дужок і + для запису лише цифр
      id: nanoid(), //додавання id за допомогою плагіну nanoid
    };
    // отримання функції через пропс і передача в неї данних
    this.props.onAddContact(contactData);
    this.setState({ name: '', number: '' }); //повернення полів в початковий стан
  };

  render() {
    return (
      //onSubmit вішаємо на форму а не на кнопку
      <form className={css.form} onSubmit={this.onSubmit}>
        <div className={css.formGroup}>
          <label className={css.formLabel}>
            <p>Name</p>
          </label>

          <input
            className={css.formInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.onChangeInput}
          />
        </div>

        <div className={css.formGroup}>
          <label className={css.formLabel}>
            <p>Phone number</p>
          </label>

          <input
            className={css.formInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.onChangeInput}
          />
        </div>

        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
