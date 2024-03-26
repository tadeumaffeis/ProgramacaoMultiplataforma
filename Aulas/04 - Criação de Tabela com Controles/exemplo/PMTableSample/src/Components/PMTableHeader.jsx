import React from 'react';
import PropTypes from 'prop-types';

class PMTableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: props.header,
        };
    }
    render() {
        const headers = 'header' in this.state
            ? this.state.header.map((header, index) => { return <th key={index}>{header}</th>; })
            : this.props.header.map((header, index) => { return <th key={index}>{header}</th>; });
        return (
            <thead>
                {<tr>{headers}</tr>}
            </thead>
        );
    }
}

PMTableHeader.propTypes = {
    header: PropTypes.array.isRequired,
};


export default PMTableHeader;