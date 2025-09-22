import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const MyRecipe = ({ recipe }) => {
  return (
    <div className="recipe">
      <h2 className="recipe__title">Recipe App Recommends:</h2>
      <ReactMarkdown className="recipe__content">{recipe}</ReactMarkdown>
    </div>
  );
};

MyRecipe.propTypes = {
  recipe: PropTypes.string.isRequired,
};

export default MyRecipe;