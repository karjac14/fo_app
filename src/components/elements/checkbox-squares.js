import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckboxSquares extends Component {

    handleCheckboxChange = i => changeEvent => {

        const { options, name } = this.props;
        let updatedOptions = options.map((option, j) => {
            return {
                ...option,
                selected: i === j && !option.selected
            }
        })

        this.props.updateOptions(updatedOptions, name);
    };

    render() {

        const { options = [] } = this.props;

        return (
            <div>
                {options.map((option, i) => (
                    <div
                        key={option.value}
                        className="radio-piece single-info col-xs-6 col-sm-4 col-md-3"
                    >
                        <label className="text-center">
                            <input
                                type="checkbox"
                                name={option.value}
                                value={option.value}
                                checked={option.selected}
                                onChange={this.handleCheckboxChange(i)}
                            />
                            <div className="radio-body">{option.label}</div>
                        </label>
                    </div>
                ))}
            </div>
        );
    }
}

CheckboxSquares.propTypes = {
    options: PropTypes.array,
    updateOptions: PropTypes.func,
    name: PropTypes.string
};

export default CheckboxSquares;