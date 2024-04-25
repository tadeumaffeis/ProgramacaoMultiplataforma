import React from 'react';
import TableContext from './TableContext';


export default class HeaderCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cell: props.content,
        }
    }
    render() {
        return (
            <th>
                {this.state.cell}
            </th>
        );
    }
}