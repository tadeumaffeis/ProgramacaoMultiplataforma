//
// Component PMTableBody
//
// File: PMTableBody.jsx
//
// Author: Antonio Tadeu Maffeis
//
// Data: 27/03/2024
//
// Description: Componente que apresentará o corpo (linhas e colunas de dados) da tabela
//
// Pre-condition: install prop-types (npm install prop-types)
//
// History
// 27/03/2024 - Antonio Tadeu Maffeis - Criacao do componente
// 
//
import React from 'react';
import PropTypes from 'prop-types';
import PMTableRow from './PMTableRow';

class PMTableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        }
    }

    render() {
        const data = 'data' in this.state ? this.state.data : this.props.data;
        return (
            <tbody>
                {
                    data.map((row, index) => {


                        return (
                            <PMTableRow key={index} row={row} />
                            //<tr key={index}>
                            //    {
                            //        Object.keys(row).map((key, index) => {
                            //            return (
                            //                <td key={index}>
                            //                    {row[key]}
                            //                </td>
                            //            );
                            //        })
                            //    }
                            //</tr>
                        );
                    })
                }
            </tbody>
        );
    }
}

PMTableBody.propTypes = {
    data: PropTypes.array.isRequired,
};

PMTableBody.defaultProps = {
    data: [],
};

export default PMTableBody;