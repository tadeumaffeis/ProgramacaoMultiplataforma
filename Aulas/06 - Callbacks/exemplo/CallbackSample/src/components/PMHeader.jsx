import React from 'react';
import TableContext from './TableContext';
import HeaderCell from './PMHeaderCell';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: props.content,
        }
    }
    render() {
        const header = this.state.header ? this.state.header : this.props.content.header;
        return (
            <thead>
                <tr>
                    {
                        header.map((item, index) => {
                            return <HeaderCell key={index} content={item}>{item}</HeaderCell>
                        })
                    }
                </tr>
            </thead>
        );
    }
}