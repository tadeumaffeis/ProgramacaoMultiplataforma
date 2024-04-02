import React from 'react';
import PropTypes from 'prop-types';
import PMTableCell from './PMTableCell';

class PMTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: props.row,
        }
    }

    render() {
        const row = 'row' in this.state ? this.state.row : this.props.row;
        return (
            <tr>
                {
                    row.map((cell, index) => 

                        return (
                            <PMTableCell key={index} cell={cell} />
                        );
)
                }
            </tr>
        );
    }
}

PMTableRow.propTypes = {
    row: PropTypes.array.isRequired,
};


export default PMTableRow;