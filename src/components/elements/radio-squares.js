import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RadioSquares extends Component {



    handleRadioChange = i => event => {


        const { options, name } = this.props;
        let updatedOptions = options.map((option, j) => {
            return {
                ...option,
                selected: i === j ? true : false
            }
        })

        this.props.updateOptions(updatedOptions, name);
    }



    render() {


        const { options = [], name } = this.props;

        return (
            <div>
                {options.map(
                    (option, i) => (
                        <div
                            key={option.value}
                            className="radio-piece single-info col-xs-6 col-sm-4 col-md-2"
                        >
                            <label className="text-center">
                                <input
                                    type="radio"
                                    name={name}
                                    value={option.value}
                                    checked={option.selected}
                                    onChange={this.handleRadioChange(i)}
                                />
                                <div className="radio-body text-center">
                                    {option.label}
                                </div>
                            </label>
                        </div>
                    )
                )}
            </div>
        );
    }
}

RadioSquares.propTypes = {
    options: PropTypes.array,
    updateOptions: PropTypes.func,
    name: PropTypes.string
};

export default RadioSquares;