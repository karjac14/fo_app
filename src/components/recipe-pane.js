
import React from 'react';
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import "../styles/recipe-pane.scss";
import Icon from "@mdi/react";
import { mdiCheckCircle, mdiPlusCircleOutline, mdiMinusCircle, mdiAccountGroup, mdiBarleyOff } from "@mdi/js";


function RecipePane(props) {

    const { recipe } = props;
    return (
        <div className="recipe-pane">
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-12 col-md-6 recipe-img">
                        <img src={recipe.image} />
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
            </div>
        </div>
    );
}

export default RecipePane;

