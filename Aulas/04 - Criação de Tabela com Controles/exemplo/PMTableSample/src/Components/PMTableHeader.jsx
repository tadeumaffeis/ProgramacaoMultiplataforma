//
// Component PMTableHeader
//
// File: PMTableHeader.jsx
//
// Author: Antonio Tadeu Maffeis
//
// Data: 27/03/2024
//
// Description: Componente que apresentará o cabeçalho das colunas da tabela
//
// Pre-condition: install prop-types (npm install prop-types)
//
// History
// 27/03/2024 - Antonio Tadeu Maffeis - Criacao do componente
// 
//
import React from 'react';
import PropTypes from 'prop-types';

class PMTableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: props.header,
        };
    }
    render() {
        const headers = 'header' in this.state
            ? this.state.header.map((header, index) => { return <th key={index*20}>{header}</th>; })
            : this.props.header.map((header, index) => { return <th key={index*20}>{header}</th>; });
        return (
            <thead>
                {<tr>{headers}</tr>}
            </thead>
        );
    }
}

PMTableHeader.propTypes = {
    header: PropTypes.array.isRequired,
};


export default PMTableHeader;