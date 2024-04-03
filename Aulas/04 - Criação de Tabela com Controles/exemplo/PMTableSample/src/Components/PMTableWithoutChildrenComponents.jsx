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
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';

export default class PMTable extends React.Component {

    constructor(props) {
        super();
        console.log(props);
        const pCaption = props.caption;
        const pHeader = props.header.map((title) => {
            return title;
        });
        const pData = props.data.map((row) => {
            return row.map((cell) => {
                return cell;
            })
        });

        this.state = {
            capytion: pCaption,
            header: pHeader,
            data: pData,
            //caption: props.caption,
            //header: props.header,
            //data: props.data,
            search: true,
            sortby: null,
            descending: false,
            download: false,
            edit: {
                row: -1,
                column: -1,
            },
        };
        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onSaveEdit = this.onSaveEdit.bind(this);
        this.onResetTable = this.onResetTable.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDownloadClickJSON = this.onDownloadClick.bind(this, 'json');
        this.onDownloadClickCSV = this.onDownloadClick.bind(this, 'csv');
        this.onMenuDownloadClick = this.onMenuDownloadClick.bind(this);
    }

    loadPropsToState(props) {
        const caption = props.caption.text;
        const header = props.header.content.map((title) => {
            return title;
        });

        const data = props.data.content.map((row) => {
            return row.content.map((cell) => {
                return cell;
            })
        });

        this.setState({
            caption,
            header,
            data,
        });
    }

    onSaveEdit(event) {
        event.preventDefault();
        const input = event.target.firstChild;
        const data = Array.from(this.state.data);
        data[this.state.edit.row][this.state.edit.column] = input.value;
        this.setState({
            data,
            edit: null
        });
    }

    onResetTable(event) {
        console.log(event);
        //const target = event.target;
        //if (target.tagName.toUpperCase() !== 'TD') {
        //    return
        //}
        this.setState({
            header: this.props.header,
            data: this.props.data,
            sortby: null,
            descending: false,
            edit: {
                row: -1,
                column: -1,
            }
        });
    }

    onDoubleClick = (event) => {
        if (event.target.tagName.toUpperCase() === 'TD') {
            this.setState({
                //header: this.props.header,
                //data: this.props.data,
                //sortby: null,
                //descending: false,
                edit: {
                    row: parseInt(event.target.parentNode.dataset.row, 10),
                    column: event.target.cellIndex,
                }
            });
        }
    }

    onSearchClick = () => {
        this.setState({
            search: this.state.search ? false : true,
        });
    }

    onSearchSubmit = (event) => {
        event.preventDefault();
        const input = event.target.firstChild;
        const data = Array.from(this.state.data);
        const search = input.value.toLowerCase();
        const filteredData = data.filter(row => row.some(cell => cell.toString().toLowerCase().includes(search)));
        this.setState({
            data: filteredData,
        });
    }

    onSearchOffClick = () => {
        this.setState({
            data: this.props.data,
        });
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
            edit: {
                row: -1,
                column: -1,
            }
        });
    }

    onDownloadClick = (format, ev) => {
        const data = Array.from(this.state.data).map(row => {
            //row.pop(); // drop the last column, the recordId
            return row;
        });

        const header = Array.from(this.state.header);

        let csvheader = '';
        let contents =
            (format === 'csv')
                ?
                header.map((headercontent) => {
                    return csvheader + `"${headercontent}"`
                }) + '\n'
                :
                ' ';

        contents +=
            format === 'json'
                ? JSON.stringify(data, null, ' ')
                : data.reduce((result, row) => {
                    return (
                        result +
                        row.reduce((rowcontent, cellcontent, idx) => {
                            const cell = cellcontent.replace(/"/g, '""');
                            const delimiter = idx < row.length - 1 ? ',' : '';
                            return `${rowcontent}"${cell}"${delimiter}` + '\n'
                        })
                    )
                }, '');
        const URL = window.URL || window.webkitURL;
        const blob = new Blob([contents], { type: 'text/' + format });
        ev.target.href = URL.createObjectURL(blob);
        ev.target.download = 'data.' + format;
    }

    onMenuDownloadClick = () => {
        event.preventDefault();
        this.setState({
            download: this.state.download ? false : true,
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
            <table >
                <caption onClick={this.onResetTable}>{caption}</caption>
                <thead onClick={this.onClick}>
                    <tr>
                        {
                            header.map((title, idx) => {
                                return <th key={idx}>{title}</th>;
                            })
                        }
                    </tr>
                </thead>
                <tbody onDoubleClick={this.onDoubleClick}>
                    {
                        data.map((row, rowidx) => {
                            return (
                                <tr key={rowidx} data-row={rowidx}>
                                    {
                                        row.map((cell, columnidx) => {
                                            const edit = this.state.edit;
                                            if (edit && edit.row === rowidx && edit.column === columnidx) {
                                                cell = (
                                                    <form onSubmit={this.onSaveEdit}>
                                                        <input type="text" defaultValue={cell} />
                                                    </form>
                                                )
                                            }
                                            return <td key={columnidx}>{cell}</td>
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <ClearIcon onClick={this.onResetTable} style={{ color: red[500] }} titleAccess='Reset Table' />
                            <SearchIcon onClick={this.onSearchClick} titleAccess='Search On/Off' />
                            {
                                this.state.search &&
                                <SearchOffIcon onClick={this.onSearchOffClick} style={{ color: red[500] }} titleAccess='Reset Search' />
                            }
                        </td>
                        <td>
                            {
                                this.state.search &&
                                <form onSubmit={this.onSearchSubmit}>
                                    <input type="text" placeholder='search string' />
                                </form>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="2em"
                                    height="2em"
                                    viewBox="0 0 24 24"
                                    onClick={this.onMenuDownloadClick}>
                                    <path fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 5v8.5m0 0l3-3m-3 3l-3-3M5 15v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2">
                                    </path>
                                </svg>
                            }
                            {
                                this.state.download &&
                                <div style={{border: '1px solid black', fontSize: '9pt', zIndx: 2}}>
                                    <div style={{display: 'list-item', listStyleType: 'none', textAlign: 'left', padding: '4px'}}>
                                        <a href="data.json" onClick={this.onDownloadClickJSON}>
                                            Export JSON
                                        </a>
                                    </div>
                                    <div  style={{display: 'list-item', listStyleType: 'none', textAlign: 'left', padding: '4px'}}>
                                        <a href="data.csv" onClick={this.onDownloadClickCSV}>
                                            Export CSV
                                        </a>
                                    </div>
                                </div>

                            }
                        </td>
                        <td colSpan={data.length - 1}>

                        </td>
                        <td>
                        </td>
                    </tr>

                </tfoot>
            </table >
        );
    }
}

PMTable.propTypes = {
    caption: PropTypes.string,
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
    header.map((title, idx) => {
                            return <th key={idx}>{title}</th>;
    )}
                    </tr>
                    </thead>
                    <tbody>
    this.state.data.map((row, idx) => {
                            return (
                                <tr key={idx}>
                row.map((cell, idx) => {
                                        return <td key={idx}>{cell}</td>;
                
                                    )}
                                </tr>
                            );
    
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
                                <>
                                        <tr key={rowidx} data-row={rowidx}>
                                            row.map((cell, columnidx) => {
                                                const edit = this.state.edit;
                                                if (edit && edit.row === rowidx && edit.column === columnidx) {
                                                    cell = (
                                                        <form onSubmit={this.onSaveEdit}>
                                                            <input type="text" defaultValue={cell} />
                                                        </form>
                                                    )
                                                }
                                            return <td key={columnidx}>{cell}</td>;
                                        </tr>
                                </>
*/