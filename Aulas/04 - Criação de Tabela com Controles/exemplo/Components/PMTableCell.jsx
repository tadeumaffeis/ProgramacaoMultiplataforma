//
// Component PMTableCell
//
// File: PMTableCell.jsx
//
// Author: Antonio Tadeu Maffeis
//
// Data: 27/03/2024
//
// Description: Componente que apresentará as células das linhas da tabela
//
// Pre-condition: install prop-types (npm install prop-types)
//
// History
// 27/03/2024 - Antonio Tadeu Maffeis - Criacao do componente
// 
//
import React from 'react';
import PropTypes from 'prop-types';

class PMTableCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cell: props.cell,
        };
    }

    render() {
        const cell = 'cell' in this.state ? this.state.cell : this.props.cell;
        return (
            <td>
                {cell}
            </td>
        );
    }
}


PMTableCell.propTypes = {
    cell: PropTypes.any.isRequired,
};

export default PMTableCell;