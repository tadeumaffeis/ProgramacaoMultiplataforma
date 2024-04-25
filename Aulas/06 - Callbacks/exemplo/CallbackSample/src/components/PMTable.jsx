import React from 'react';
import Caption from './PMCaption';
import Header from './PMHeader';
import TableContext, { } from './TableContext';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('PMTable: ', this.state);
        return (
            <TableContext.Consumer>
                {
                    value => {
                        console.log('PMTable: ', value);
                        return (
                            <table>
                                <Caption content={value.tableData.caption} />
                                <Header content={value.tableData.header} />
                            </table>
                        );
                    }
                }
            </TableContext.Consumer>

        );
    }
}