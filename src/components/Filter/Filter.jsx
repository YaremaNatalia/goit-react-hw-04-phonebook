import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ filter, onFilterChange }) => {
  return (
    <div className={css.formGroup}>
      <label className={css.formLabel}>
        <p>Find contacts by name o phone number</p>
      </label>

      <input
        className={css.formInput}
        type="text"
        title="Filter using letters, digits, apostrophe, dash and spaces, and can start with +."
        required
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
