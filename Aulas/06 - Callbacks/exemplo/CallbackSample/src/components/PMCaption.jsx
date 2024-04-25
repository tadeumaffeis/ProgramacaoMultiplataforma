import React from 'react';
import TableContext, { } from './TableContext';

export default class Caption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: props.content,
        };
    }
    render() {
        return (
            <caption>
                {this.state.caption}
            </caption>
        );
    }
}