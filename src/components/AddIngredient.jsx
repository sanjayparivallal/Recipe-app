import PropTypes from 'prop-types';

const AddIngredient = ({ onAdd, length }) => {
  function addIngredient(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get('ingredient');
    if (!newIngredient) {
      alert('Please enter an ingredient');
    } else {
      onAdd(newIngredient);
    }
    event.currentTarget.reset();
  }

  return (
    <form className="form" onSubmit={addIngredient}>
      <input
        aria-label="Add Ingredient"
        type="text"
        name="ingredient"
        className="form__input"
        placeholder="e.g. oregano"
      />
      <button type="submit" className="form__button">
        Add Ingredient
      </button>
      {length < 4 && <p className="form__info">Please, add at least four ingredients to generate a recipe.</p>}
    </form>
  );
};

AddIngredient.propTypes = {
  onAdd: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
};

export default AddIngredient;