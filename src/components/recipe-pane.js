
import React from 'react';
import PropTypes from "prop-types";

import "../styles/recipe-pane.scss";
import Icon from "@mdi/react";
import { mdiAccountGroup, mdiBarleyOff } from "@mdi/js";


function RecipePane(props) {

    const { recipe } = props;
    return (
        <div className="recipe-pane">
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-12 col-md-6 recipe-img">
                        <img alt={recipe.title} src={recipe.image} />
                    </div>
                    <div className="col col-12 col-md-6">
                        <h3>{recipe.title}</h3>
                        <p>
                            {recipe.readyInMinutes &&
                                <span title="preparation and cooking time">{recipe.readyInMinutes} mins &nbsp; | &nbsp; </span>
                            }
                            {recipe.servings &&
                                <span title="no. of servings"> <Icon size={.7} path={mdiAccountGroup} /> <span> {recipe.servings}  &nbsp; | &nbsp;  </span></span>
                            }
                            {recipe.glutenFree &&
                                <span className="gluten-free" title="*gluten-free"> <Icon size={.7} path={mdiBarleyOff} /> </span>
                            }
                        </p>
                    </div>
                </div>
                <div className="row row-ingredients">
                    <div className="col col-12">
                        <h5>Ingredients</h5>
                        <ul className="list-group list-group-flush">
                            {recipe.extendedIngredients.map((ing, i) => (
                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    {ing.name}
                                    <span className="">{ing.amount} {ing.unit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="row row-steps">
                    <div className="col col-12">
                        <h5>Directions</h5>
                        <ul className="list-group list-group-flush">
                            {recipe.analyzedInstructions[0].steps.map((ing, i) => (
                                <li key={i} className="list-group-item d-flex">
                                    <strong className="step-num">{i + 1}.</strong>{ing.step}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

RecipePane.propTypes = {
    recipe: PropTypes.object.isRequired
};

RecipePane.defaultProps = {
    recipe: {}
};

export default RecipePane;

