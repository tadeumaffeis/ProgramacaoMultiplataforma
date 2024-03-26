//
// Component PMTable
//
// File: PMTable.jsx
//
// Author: Antonio Tadeu Maffeis
//
// Data: 27/03/2024
//
// Description: Componente que exibe uma tabela com os dados de um array de objetos
//
// Pre-condition: install prop-types (npm install prop-types)
//
// History
// 27/03/2024 - Antonio Tadeu Maffeis - Criacao do componente
// 
//

import React from 'react';
import PropTypes from 'prop-types';
import PMTableCaption from './PMTableCaption';
import PMTableHeader from './PMTableHeader';
import PMTableBody from './PMTableBody';

export default class PMTable extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            caption: props.caption,
            header: props.header,
            data: props.data,
        };
    }

    render() {
        const caption = 'caption' in this.state ? this.state.caption : this.props.caption; 
        const header = 'header' in this.state ? this.state.header : this.props.header;
        const data = 'data' in this.state ? this.state.data : this.props.data;
        return (
            <table>
                <PMTableCaption text={caption} />
                <PMTableHeader header={header} />
                <PMTableBody data={data} />
            </table>
        );
    }

}

PMTable.propTypes = {
    caption: PropTypes.string.isRequired,
    header: PropTypes.array,
    data: PropTypes.array,
};

PMTable.defaultProps = {
    caption: 'Table',
    header: [],
    data: [],
};