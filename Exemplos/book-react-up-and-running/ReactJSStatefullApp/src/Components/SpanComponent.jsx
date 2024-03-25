import { } from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';

export class SpanComponent extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        //this.state = {};
        console.log(this.props.initialValue);
        //this.onMouseOver = this.onMouseOver.bind(this);
        //this.onMouseOut = this.onMouseOut.bind(this);
    }
    render() {
        return (
            <span>{this.props.initialValue}</span>
        );
    }
    /*
        onMouseOver = (event) => {
            this.setState({
                style: {
                    border: '1px solid red',
                    hover: true,
                },
            });
            console.log(event);
        }
    
        onMouseOut = (event) => {
            this.setState({
                style: {
                    border: '1px solid black',
                    hover: false,
                },
            });
            console.log(event);
        }
        render() {
            const text = 'text' in this.state ? this.state.text : this.props.text;
            const style = 'style' in this.state ? this.state.style : this.props.style;
            return (
                <div>
                    <span
                        style={style}
                        onMouseOver={this.onMouseOver()}
                        onMouseOut={this.onMouseOut()}
                    >
                        {text}
                    </span>
                </div >
            );
        }
        */
}

SpanComponent.propTypes = {
    initialValue: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
};

SpanComponent.defaultProps = {
    text: 'Default Text',
    style: { border: '1px solid black' },
};