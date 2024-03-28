/** 
 * Component PMTable
 *
 * File: PMTable.jsx
 *
 * Author: Antonio Tadeu Maffeis
 *
 * Data: 27/03/2024
 *
 * Description: Componente que exibe uma tabela com os dados de um array de objetos
 *
 * Dependency: prop-types (npm install prop-types)
 *
 * History
 * 27/03/2024 - Antonio Tadeu Maffeis - Criacao do componente
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class PMTable extends React.Component {

    constructor(props) {
        super();

        this.state = {
            caption: props.caption,
            header: props.header,
            data: props.data,
            sortby: null,
            descending: false,
        };
        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
    }

    onDoubleClick = (event) => {
        if (event.target.tagName.toUpperCase() === 'TD') {
            this.setState({
                header: this.props.header,
                data: this.props.data,
                sortby: null,
                descending: false,
            });
        }
    }

    onClick = (event) => {
        const column = event.target.tagName.toUpperCase() === 'TH' ? event.target.cellIndex : -1;
        const data = Array.from(this.state.data);
        const descending = this.state.sortby === column && !this.state.descending;
        data.sort((a, b) => {
            if (a[column] === b[column]) {
                return 0;
            }
            return descending
                ? a[column] < b[column]
                    ? 1
                    : -1
                : a[column] > b[column]
                    ? 1
                    : -1;
        });
        this.setState({
            data,
            sortby: column,
            descending,
        });
    }

    render() {
        const caption = 'caption' in this.state ? this.state.caption : this.props.caption;
        const data = 'data' in this.state ? this.state.data : this.props.data;
        const header = this.state.header.map((title, idx) => {
            if (this.state.sortby === idx) {
                title += this.state.descending ? ' \u2191' : ' \u2193';
            }
            return title;
        });

        return (
            <table onClick={this.onClick} onDoubleClick={this.onDoubleClick}>
                <caption>{caption}</caption>
                <thead>
                    <tr>
                        {header.map((title, idx) => {
                            return <th key={idx}>{title}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, idx) => {
                            return (
                                <tr key={idx}>
                                    {row.map((cell, idx) => {
                                        return <td key={idx}>{cell}</td>;
                                    }
                                    )}
                                </tr>
                            );
                        }
                        )
                    }
                </tbody>
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

/*

    Histórico de Testes 
    -------------------
                    <PMTableCaption text={caption} />
                    <PMTableHeader header={header} />
                    <PMTableBody data={data} />

        <table onClick={this.onClick}>
                <caption>{caption}</caption>
                <thead>
                    <tr>
                        {header.map((title, idx) => {
                            return <th key={idx}>{title}</th>;
                        })}
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((row, idx) => {
                            return (
                                <tr key={idx}>
                                    {row.map((cell, idx) => {
                                        return <td key={idx}>{cell}</td>;
                                    }
                                    )}
                                </tr>
                            );
                        }
                        )}
                    </tbody>
            </table>

             *const html_caption = new PMTableCaption({ text: caption }).render();
             *const html_headers = new PMTableHeader({ header: header }).render();
             *const html_body = new PMTableBody({ data: data }).render();


             *<table onClick={this.onClick}>
             *    {html_caption}
             *    {html_headers}
             *    {html_body}
             *</table>

    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (obj instanceof Array) {
            let copy = [];
            for (let i = 0; i < obj.length; i++) {
                copy[i] = this.deepClone(obj[i]);
            }
            return copy;
        }

        if (obj instanceof Object) {
            let copy = {};
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    copy[key] = this.deepClone(obj[key]);
                }
            }
            return copy;
        }
    }

*/