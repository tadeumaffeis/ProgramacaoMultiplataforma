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
// 08/04/2024 - Antonio Tadeu Maffeis - Adicao de Componentes PMTableCaption, PMTableHeader, PMTableBody, PMTableRow e PMTableCell 
// 
//

import PropTypes from 'prop-types';
import React from 'react';
import './modules/main.slider.css';

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
    }

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

    onClick = (event) => {
        const column = event.target.tagName.toUpperCase() === 'TH' ? event.target.cellIndex : -1;
        if (column < 0) {
            return;
        }

        const tbodyArray = document.getElementById('tbodyMain').childNodes;
        let dataTBody = Array(tbodyArray.length);
        tbodyArray.forEach((row, indexRow) => {
            dataTBody[indexRow] = Array(row.childNodes.length);
            row.childNodes.forEach((cell, indexCol) => {
                dataTBody[indexRow][indexCol] = cell.innerHTML;
            });
        });
               
        const data = Array.from(dataTBody);

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
        const header = this.props.header.map((title, idx) => {
            if (this.state.sortby === idx) {
                title += this.state.descending ? ' \u2191' : ' \u2193';
            }
            return title;
        });

        const DataContext = React.createContext();
        const newState = {
            caption: caption,
            header: header,
            data: data,
        };
        return (
            <>
                <table className="table" onClick={this.onClick} style={{ borderCollapse: 'collapse' }}>
                    <DataContext.Provider value={newState}>
                        <PMTableCaption text={caption} />
                        <PMTableHeader headers={header} />
                        <PMTableBody data={data} />
                    </DataContext.Provider >
                </table>
            </>
        );
    }
}

export class PMTableCaption extends React.Component {
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
}

export class PMTableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: props.headers,
        };
    }
    render() {
        const headers = 'header' in this.state
            ? this.state.header.map((header, index) => { return <th key={index * 20}>{header}</th>; })
            : this.props.headers.map((header, index) => { return <th key={index * 20}>{header}</th>; });
        return (
            <thead>
                {<tr>{headers}</tr>}
            </thead>
        );
    }
}

export class PMTableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        }
    }

    render() {
        const data = 'data' in this.state ? this.state.data : this.props.data;
        return (
            <tbody id='tbodyClass'>
                {
                    data.map((row, index) => {


                        return (
                            <PMTableRow key={index} row={row} />
                        );
                    })
                }
            </tbody>
        );
    }
}

export class PMTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: props.row,
        }
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
    }

    onMouseOver = (event) => {
        const row = event.target.parentNode;
        row.style.backgroundColor = 'lightgray';
    }

    onMouseOut = (event) => {
        const row = event.target.parentNode;
        row.style.backgroundColor = 'white';
    }

    render() {
        const row = 'row' in this.state ? this.state.row : this.props.row;
        return (
            <tr onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                {
                    row.map((cell, index) => {
                        return (
                            <PMTableCell key={index} cell={cell} />
                        );
                    })
                }
            </tr>
        );
    }
}

export class PMTableCell extends React.Component {
    constructor(props) {
        super(props);
        this.DataContext = React.createContext();

        this.state = {
            cell: props.cell,
        };
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onDoubleClick = () => {
        const cell = 'cell' in this.state ? this.state.cell : this.props.cell;
        const editCell = (
            <form onSubmit={this.onEdit}>
                <input type="text" defaultValue={cell} />
            </form>
        );

        this.setState({ cell: editCell });
    }

    onEdit = (event) => {
        event.preventDefault();
        const cell = event.target.firstChild.value;
        this.setState({ cell });
    }

    render() {
        const cell = 'cell' in this.state ? this.state.cell : this.props.cell;
        return (
            <td onDoubleClick={this.onDoubleClick}>
                {cell}
            </td>
        );
    }
}

PMTable.propTypes = {
    caption: PropTypes.string.isRequired,
    header: PropTypes.array,
    data: PropTypes.array,
    children: PropTypes.object,
};

PMTable.defaultProps = {
    caption: 'Table',
    header: [],
    data: [],
};

PMTableCaption.propTypes = {
    text: PropTypes.string.isRequired,
    listener: PropTypes.object,
};

PMTableCaption.defaultProps = {
    text: "Table",
};

PMTableHeader.propTypes = {
    headers: PropTypes.array.isRequired,
};

PMTableBody.propTypes = {
    data: PropTypes.array.isRequired,
};

PMTableBody.defaultProps = {
    data: [],
};

PMTableRow.propTypes = {
    row: PropTypes.array.isRequired,
};

PMTableCell.propTypes = {
    cell: PropTypes.any.isRequired,
};
