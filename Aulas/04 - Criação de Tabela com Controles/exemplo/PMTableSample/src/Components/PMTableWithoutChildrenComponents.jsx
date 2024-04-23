/* eslint-disable react-refresh/only-export-components */
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
 *             styled-components (npm install styled-components)
 *             material-ui (npm install @mui/material @emotion/react @emotion/styled)
 *
 * History
 * 27/03/2024 - Antonio Tadeu Maffeis - Criacao do componente
 * 01/04/2024 - Antonio Tadeu Maffeis - Adicao de funcionalidades de edicao, ordenacao, busca e download
 * 02/04/2024 - Antonio Tadeu Maffeis - Adicao de funcionalidade de reset da tabela e filtragem de dados
 * 03/04/2024 - Antonio Tadeu Maffeis - Adicao de funcionalidade de download de dados em JSON e CSV
 * 03/04/2024 - Antonio Tadeu Maffeis - Adicao de funcionalidade de redo da ultima filtragem
 */
import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import { red } from '@mui/material/colors';
import Styled from 'styled-components';
import '../Modules/module.table.css'


const MyDiv = Styled.div`
    padding: 10px 20px;
    background-color: white;
    color: black;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: lightgray;
    }
`;
export default class PMTable extends React.Component {
    /**
     * Construtor da classe PMTable
     * @param {pops} props O array contendo os argumentos passados para o construtor.
     * @param {array} props.caption O array contendo a legenda da tabela.
     * @param {array} props.header O array contendo o cabecalho das colunas da tabela.
     * @param {array} props.data O array contendo os dados da tabela (linhas e colunas).
     */
    constructor(props) {
        super();

        const pCaption = props.caption;
        const pHeader = props.header.map((title) => {
            return title.replace(/""/g, "\"");
        });

        console.log('pHeader', pHeader);

        const pData = props.data.map((row) => {
            return Array.from(row).map((cell) => {
                return JSON.parse(cell.replace('\\"', '"').replace("\"{", "{").replace("}\"", "}"));
                //return JSON.parse(cell.replace(/""/g, "\"").slice(1, -1).replace("\"{", "{").replace("}\"", "}"));
            });
        });

        this.logState = Array.from([]);

        this.state = {
            caption: pCaption,
            header: pHeader,
            data: pData,
            search: true,
            sortby: null,
            descending: false,
            download: false,
            edit: {
                row: -1,
                column: -1,
            },
        };

        this.keyentry = 0;

        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onSaveEdit = this.onSaveEdit.bind(this);
        this.onResetTable = this.onResetTable.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDownloadClickJSON = this.onDownloadClick.bind(this, 'json');
        this.onDownloadClickCSV = this.onDownloadClick.bind(this, 'csv');
        this.onMenuDownloadClick = this.onMenuDownloadClick.bind(this);
        this.onMouseOverIcon = this.onMouseOverIcon.bind(this);
        this.onMouseOutIcon = this.onMouseOutIcon.bind(this);
        this.onMouseOutRow = this.onMouseOutRow.bind(this);
        this.onMouseOverRow = this.onMouseOverRow.bind(this);
        this.onKeyEscPress = this.onKeyEscPress.bind(this);
        document.addEventListener('keydown', this.onKeyEscPress);
    }

    onSaveEdit(event) {
        event.preventDefault();
        const pos = {
            discipline: 0,
            course: 2,
            professor: 4,
        };
        const input = event.target.childNodes;
        const data = Array.from(this.state.data);
        const nodeSelector = document.querySelectorAll('.selectedcell')
        console.log("NodeSelector; ", nodeSelector);

        nodeSelector.forEach((node) => {
            const child = node.childNodes;
            if (node.tagName === 'td') {
                child.forEach((element) => {
                    data[node.dataset.row][node.dataset.column][element.name] = input[pos[element.name]].value;
                    console.log("::::::> ", data[node.dataset.row][node.dataset.column]);
                });
            }
            //console.log("::::::> ", data[node.dataset.row][node.dataset.column]);
        });

        //child.forEach((element) => {
        //    if (element.tagName === 'INPUT' && element.type === 'text') {
        //        {
        //            data[event.target.parentNode.dataset.row][event.target.parentNode.dataset.column][element.name] = element.value;
        //            //console.log('*** element -->', element.value, element.tagName, element.name, element.type, event.target.parentNode.dataset.row, event.target.parentNode.dataset.column);
        //        }
        //        //console.log('*** element -->', element.value, element.tagName, element.name, element.type, event.target.parentNode.dataset.row, event.target.parentNode.dataset.column);
        //    }
        //    console.log('*** element -->', element.value, element.tagName, element.name, element.type, event.target.parentNode.dataset.row, event.target.parentNode.dataset.column);
        //});
        //console.log("Object: ",data[event.target.parentNode.dataset.row][event.target.parentNode.dataset.column]);
        //console.log('Data:',
        //    data[event.target.parentNode.dataset.row][event.target.parentNode.dataset.column],
        //    event.target.parentNode.dataset.row,
        //    event.target.parentNode.dataset.column
        //);
        //});


        //data[this.state.edit.row][this.state.edit.column] = {
        //    discipline: input[0].value,
        //     course: input[2].value,
        //     professor: input[4].value,
        //};
        this.setState({
            data,
            edit: null
        });
    }



    onResetTable() {
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

        if (event.target.tagName.toUpperCase() === 'DIV') {
            this.setState({
                edit: {
                    row: parseInt(event.target.parentNode.parentNode.dataset.row, 10),
                    column: event.target.parentNode.cellIndex,
                }
            });
            console.log(this.state);
        }
    }

    onSearchClick = () => {
        this.setState({
            search: this.state.search ? false : true,
        });
    }

    onSearchSubmit = (event) => {
        event.preventDefault();
        this.logState.push(this.state);
        const input = event.target.firstChild;
        const data = Array.from(this.state.data);
        const search = input.value.toLowerCase();
        const filteredData = data.filter(row => row.some(cell => cell.toString().toLowerCase().includes(search)));
        this.setState({
            data: filteredData,
        });
    }

    onSearchOffClick = () => {
        if (this.logState.length > 0) {
            this.setState(this.logState.pop());
        }
    }

    onClick = (event) => {
        const column = event.target.tagName.toUpperCase() === 'TH' ? event.target.cellIndex : -1;
        const data = Array.from(this.state.data);
        const descending = this.state.sortby === column && !this.state.descending;
        if (column <= 0) {
            return;
        }
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

    onMouseOverIcon = (event) => {
        const icon = event.target;
        icon.style.border = '1px solid black';
    }

    onMouseOutIcon = (event) => {
        const icon = event.target;
        icon.style.border = 'none';
    }

    onMouseOverRow = (event) => {
        const row = event.target.parentNode;
        row.style.backgroundColor = 'lightgray';
    }

    onMouseOutRow = (event) => {
        const row = event.target.parentNode;
        row.style.backgroundColor = 'white';
    }

    onMouseOverCell = (event) => {
        const cell = event.target;
        console.log(cell);
    }

    onDownloadClick = (format, ev) => {
        const data = Array.from(this.state.data).map(row => {
            return row;
        });

        const header = this.state.header;

        let csvheader = '';
        let contents =
            (format === 'csv')
                ?
                header.map((headercontent) => {
                    return csvheader + `"${headercontent}"`
                }) + '\n'
                :
                ' ';

        let json = {
            information: {
                title: {
                    type: "caption",
                    text: "Horário de Aulas da Sala (Laboratório de Informática 01)"
                },
                colunmHeader: {
                    type: "header",
                    content:
                        header.map((headercontent) => {
                            return `${headercontent}`;
                        })

                },
                reservations: {
                    type: "array",
                    content:
                        data.map(row => {
                            return row.map(cell => {
                                return `"${JSON.stringify(cell)}"`;
                            })
                        })
                }
            }
        };

        if (format === 'json') {
            // Formata como JSON
            contents = json; //JSON.stringify(json, null, ' ');
        } else {
            // Formata como CSV (ou um formato similar de texto plano)
            contents += data.map(row => {
                return Object.keys(row).map(key => {
                    // Coloca aspas em volta dos valores de string
                    const value = row[key];
                    return typeof value === 'string' ? `"${value}"` : value;
                }).join(','); // Separa os valores por vírgula
            }).join('\n'); // Separa as linhas por quebra de linha
        }

        console.log('Download: ', json, contents);

        const URL = window.URL || window.webkitURL;
        const blob = new Blob([JSON.stringify(contents)], { type: 'text/' + format });
        ev.target.href = URL.createObjectURL(blob);
        ev.target.download = 'data.' + format;

    }

    onMenuDownloadClick = (event) => {
        event.preventDefault();
        this.setState({
            download: this.state.download ? false : true,
        });
    }

    onKeyEscPress = (event) => {
        const key = event.key;
        if (key === 'Escape') {
            this.setState({
                edit: null,
                sortby: null,
                descending: false,
                download: false,
            });
        }
    }

    onClickTD = (event) => {
        const cell = event.target.parentNode;
        console.log('cell', cell, cell.dataset);
        cell.dataset.selection = cell.dataset.selection === 'true' ? 'false' : 'true';
        const child = cell.childNodes;
        let style = '';

        if (cell.dataset.selection === 'true') {
            style = 'selectedcell';
        }
        else {
            style = 'unselectedcell';
        }
        cell.className = style;
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
            <>
                <table id='mainTable' onKeyDown={this.onKeyEscPress}
                    style={{ fontFamily: 'Arial, sans-serif', borderCollapse: 'collapse', border: '1pt solid lightgray' }}>
                    <caption onClick={this.onResetTable}
                        style={{ backgroundColor: 'lightsteelblue', fontSize: '20px', fontWeight: 'bold', color: 'blue', padding: '0.5em' }}>
                        {caption}
                    </caption>
                    <thead onClick={this.onClick}>
                        <tr style={{ backgroundColor: 'lightgrey' }}>
                            {
                                header.map((title, idx) => {
                                    return <th key={idx} style={{ padding: '0.5em' }}>{title}</th>;
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((row, rowidx) => {
                                return (
                                    <tr key={rowidx}
                                        data-row={rowidx}>
                                        {
                                            row.map((cell, columnidx) => {
                                                const edit = this.state.edit;
                                                let cellcontent;
                                                if (edit && edit.row === rowidx && edit.column === columnidx) {
                                                    cellcontent = (
                                                        <form onSubmit={this.onSaveEdit}>
                                                            <input name='discipline' type="text" defaultValue={cell.discipline} /><br />
                                                            <input name='course' type="text" defaultValue={cell.course} /><br />
                                                            <input name='professor' type="text" defaultValue={cell.professor} /><br />
                                                            <input type="submit" value='Save' />
                                                        </form>
                                                    )
                                                }
                                                else {
                                                    cellcontent = (
                                                        cell.time === undefined
                                                            ?
                                                            <>
                                                                <div id='discipline' key={this.keyentry++} dangerouslySetInnerHTML={{ __html: cell.discipline }}></div>
                                                                <div id='course' key={this.keyentry++} dangerouslySetInnerHTML={{ __html: cell.course }}></div>
                                                                <div id='professor' key={this.keyentry++} dangerouslySetInnerHTML={{ __html: cell.professor }}></div>
                                                            </>
                                                            :
                                                            <div id='time' key={this.keyentry++} dangerouslySetInnerHTML={{ __html: cell.time }}></div>

                                                    )
                                                }
                                                return (<td key={columnidx}
                                                    style={{ textAlign: 'left', paddingLeft: '0.5em', paddingRight: '0.5em' }}
                                                    className='unselectedcell'
                                                    data-selection='false'
                                                    data-row={rowidx}
                                                    data-column={columnidx}
                                                    onDoubleClick={this.onDoubleClick}
                                                    onClick={e => this.onClickTD(e)}
                                                >
                                                    {cellcontent}
                                                </td>);
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                    <tfoot style={{ backgroundColor: 'lightsteelblue' }}>
                        <tr>
                            <td colSpan="7" style={{ padding: '5pt' }}>
                                <div style={{ float: 'left', position: 'relative' }}>
                                    <DownloadIcon
                                        onClick={this.onMenuDownloadClick}
                                        onMouseOver={this.onMouseOverIcon}
                                        onMouseOut={this.onMouseOutIcon}
                                        titleAccess='Download JSON/CSV'

                                    />
                                    <ClearIcon
                                        onClick={this.onResetTable}
                                        onMouseOver={this.onMouseOverIcon}
                                        onMouseOut={this.onMouseOutIcon}
                                        style={{ color: red[500] }}
                                        titleAccess='Reset Table' />
                                    <SearchIcon
                                        onClick={this.onSearchClick}
                                        onMouseOver={this.onMouseOverIcon}
                                        onMouseOut={this.onMouseOutIcon}
                                        titleAccess='Search On/Off' />
                                    {
                                        this.state.search &&
                                        <SearchOffIcon
                                            onClick={this.onSearchOffClick}
                                            onMouseOver={this.onMouseOverIcon}
                                            onMouseOut={this.onMouseOutIcon}
                                            style={{ color: red[500] }}
                                            titleAccess='Reset Last Search' />
                                    }
                                </div>
                                <div style={{ float: 'left', position: 'relative', paddingLeft: '2px' }}>
                                    {
                                        this.state.search &&
                                        <form onSubmit={this.onSearchSubmit}>
                                            <input type="text" placeholder='search string' />
                                        </form>
                                    }
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="7" style={{ backgroundColor: '#ffffff' }}>
                                {
                                    this.state.download
                                    &&
                                    <div style={{ border: '1px solid black', fontSize: '9pt', position: 'absolute', zIndex: 2 }}>
                                        <MyDiv style={{ display: 'list-item', listStyleType: 'none', textAlign: 'left', padding: '1px' }}>
                                            <a href="data.json" onClick={this.onDownloadClickJSON}>
                                                Export JSON
                                            </a>
                                        </MyDiv>
                                        <MyDiv style={{ display: 'list-item', listStyleType: 'none', textAlign: 'left', padding: '1px' }}>
                                            <a href="data.csv" onClick={this.onDownloadClickCSV}>
                                                Export CSV
                                            </a>
                                        </MyDiv>
                                    </div>
                                }
                            </td>
                        </tr>
                    </tfoot>
                </table >
            </>
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
                                                          <svg xmlns="http://www.w3.org/2000/svg"
                                width="1.5em"
                                height="1.5em"
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
*/