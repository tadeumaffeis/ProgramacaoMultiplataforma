import React from 'react';
import PropTypes from 'prop-types';

class PMTableBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        }
    }

    render() {
        const data = 'data' in this.state ? this.state.data : this.props.data;
        console.log(data);
        return (
            <tbody>
                {
                    data.map((row, index) => {
                        return (
                            <tr key={index}>
                                {
                                    Object.keys(row).map((key, index) => {
                                        return (
                                            <td key={index}>
                                                {row[key]}
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        );
                    })

                }
            </tbody>
        );
    }
}

PMTableBody.propTypes = {
    data: PropTypes.array.isRequired,
};

PMTableBody.defaultProps = {
    data: [],
};

export default PMTableBody;