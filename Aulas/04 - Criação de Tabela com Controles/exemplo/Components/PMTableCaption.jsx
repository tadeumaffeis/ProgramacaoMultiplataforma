//
// Component PMTableCaption
//
// File: PMTableCaption.jsx
//
// Author: Antonio Tadeu Maffeis
//
// Data: 27/03/2024
//
// Description: Componente que exibe uma caption da tabela
//
// Pre-condition: none
//
// History
// 27/03/2024 - Antonio Tadeu Maffeis - Criacao do componente
// 
//
import React from 'react';
import PropTypes from 'prop-types';

class PMTableCaption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
        };
    }
    render() {
        const text = 'text' in this.state ? this.state.text : this.props.text;
        return (
            <caption>{text}</caption>
        );
    }
    // Methods and properties go here
}

PMTableCaption.propTypes = {
    text: PropTypes.string.isRequired,
};

PMTableCaption.defaultProps = {
    text: "Table",
};

export default PMTableCaption;