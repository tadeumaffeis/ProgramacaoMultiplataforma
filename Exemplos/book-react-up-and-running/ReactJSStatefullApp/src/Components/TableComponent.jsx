
import PropTypes from 'prop-types';
import React from 'react';
import './Style/Component.css'

export class TableComponent extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            data: this.props.initialData,
            sortby: null,
            descending: false,
        };
        this.sort = this.sort.bind(this);
        this.showEditor = this.showEditor.bind(this);
        //this.save = this.save.bind(this);
    }


    sort = (event) => {
        const column = event.target.cellIndex;
        const data = this.clone(this.state.data);
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

        //data.sort((a, b) => {
        //    if (a[column] === b[column]) {
        //        return 0;
        //    }
        //    return a[column] > b[column] ? 1 : -1;
        //});
        this.setState({
            data,
            sortby: column,
            descending,
        });
    }

    clone = (o) => {
        return JSON.parse(JSON.stringify(o));
    }

    showEditor = (e) => {
        this.setState({
            edit: {
                row: parseInt(e.target.parentNode.dataset.row, 10),
                column: e.target.cellIndex,
            },
        });
    }

    save = (event) => {
        event.preventDefault();
        const input = event.target.firstChild;
        const data = this.clone(this.state.data);
        data[this.state.edit.row][this.state.edit.column] = input.value;
        this.setState({
            edit: null,
            data,
        });
    }

    render() {
        const headers = [];
        //
        // Uma opção para iterar sobre um array
        //
        //for (const title of this.props.headers) {
        //    headers.push(<th>{title}</th>);
        //}
        // opção com key para identificar cada elemento unicamente

        for (const idx in this.props.headers) {
            const title = this.props.headers[idx];
            headers.push(<th key={idx}>{title}</th>);
        }
        return (
            <table className='allTable'>
                <thead className='allTable' onClick={this.sort}>
                    <tr className='allTable'>
                        {
                            this.props.headers.map((title, idx) => {
                                if (this.state.sortby === idx) {
                                    title += this.state.descending ? ' \u2191' : ' \u2193'
                                }
                                return <th key={idx}>{title}</th>
                            })

                            // headers
                            //
                            // Uma opção para iterar sobre um array com key e map
                            //
                            //this.props.headers.map((title, index) => {
                            //    console.log(title);
                            //    return (<th key={index}>{title}</th>);
                            //)
                        }
                    </tr>
                </thead>
                <tbody onDoubleClick={this.showEditor}>
                    {this.state.data.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex} className='allTable' data-row={rowIndex}>
                                {row.map((cell, colIndex) => {
                                    const edit = this.state.edit;
                                    if (edit && edit.row === rowIndex && edit.column === colIndex) {
                                        cell = (
                                            <form onSubmit={this.save}>
                                                <input type="text" defaultValue={cell} className='inputClass'/>
                                            </form>
                                        );
                                    }
                                    return (<td key={colIndex} className='allTable'>{cell}</td>);
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

}

//TableComponent.propTypes = {
//    headers: PropTypes.array.isRequired,
//    initialData: PropTypes.array.isRequired,
//};
TableComponent.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
