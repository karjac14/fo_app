
import React from 'react';
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";



function RecipePane(props) {

    const { recipe } = props;
    return (
        <div className="refer-pane">
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-md-6">
                        <img src={recipe.image} />
                    </div>
                    <div className="col col-12 col-md-6">
                    {recipe.title}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipePane;

