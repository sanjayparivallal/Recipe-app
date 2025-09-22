import PropTypes from 'prop-types';

const Cta = ({ toggleRecipe, loading }) => {
  return (
    <div className="cta">
      <div className="cta__content">
        <h3 className="cta__content-title">Ready to get started?</h3>
        <p className="cta__content-para">Generate a recipe from your list of ingredients.</p>
      </div>
      <button
        onClick={toggleRecipe}
        className="cta__button"
      >
        {!loading ? "Get a recipe" : (
          <span>
            <span className="loader"></span>
            Getting...
          </span>
        )}
      </button>
    </div>
  );
};

Cta.propTypes = {
  toggleRecipe: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Cta;