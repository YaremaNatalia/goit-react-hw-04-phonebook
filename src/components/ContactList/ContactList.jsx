import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <ul className={css.contactList}>
      {/* деструктиризуємо в мапі необхідні значення */}
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.contactItem}>
          <p className={css.contactName}>{name}:</p>
          <span className={css.contactNumber}>{number}</span>
          <button
            type="button"
            className={css.removeBtn}
            //! викликаємо функцію onRemoveContact як СТІЛОЧНУ і передаємо в неї id ЛИШЕ ПРИ КЛІКУ на кнопку а не при рендері
            onClick={() => {
              onRemoveContact(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ),

  onRemoveContact: PropTypes.func.isRequired,
};
