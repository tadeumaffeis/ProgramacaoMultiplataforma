import React from 'react';
import PropTypes from 'prop-types';

class TextAreaComponent extends React.PureComponent {
    // constructor
    constructor(props) {
        super(props);
        this.state = {
            text: props.value, // Usar um nome de estado mais descritivo
            style: props.style,
        };
    }

    getName() {
        return ('TextAreaComponent::');
    }

    // lifecycle methods
    componentDidMount() {
        console.log('1. ->' + this.getName() + 'componentDidMount');
    }
    componentWillUnmount() {
        console.log('2. ->' + this.getName() + 'componentWillUnmount');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.defaultValue && this.props.value && this.state.text.length < 3) {
            this.setState({
                text: this.props.value, /*prevState.defaultValue || this.props.defaultValue,*/
            });
            this.value = this.state.defaultValue;
            console.log('3. componentDidUpdate ***', this.state.defaultValue);
        }
        console.log('3. componentDidUpdate ***', this.state);
        console.log('3. ->' + this.getName() + 'componentDidUpdate', prevProps, prevState, snapshot);
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('4. ->' + this.getName() + 'getSnapshotBeforeUpdate', prevProps, prevState);
        return 'hello';
    }
    //shouldComponentUpdate(newProps, newState) {
        //console.log('5. ->' + this.getName() + 'shouldComponentUpdate ', newProps, newState);
        //return true;
        //return newState.text.length > 5 ? true : false;
    //}

    // event handlers
    onTextChange = (event) => {
        const newText = event.target.value && event.target.value.length > 2 ? event.target.value : this.props.value;
        this.setState({
            text: newText,
            style: {
                color: newText.length > 10 ? 'black' : 'red',
            },
        });
    };
    /*
    onTextChange(event) {
        this.setState({
            defaultValue: event.target.value,
        });
        this.setState({
            style:
            {
                color: event.target.value.length > 10 ? 'black' : 'red'
            },
        });
        this.value = this.state.defaultValue;
    }
    */
    onMouseOver = () => {
        this.setState({
            style: {
                border: '1pt solid red',
            },
        });
    };
    /*
    onMouseOver(event) {
        this.setState({
            style:
            {
                border: '1pt solid red',
                color: event.target.value.length > 10 ? 'black' : 'red'
            },
        });
    }
    */
    onMouseOut = () => {
        this.setState({
            style: {
                border: '1pt solid black',
            },
        });
    };

    /*
    onMouseOut(event) {
        this.setState({
            style:
            {
                border: '1pt solid black',
                color: event.target.value.length > 10 ? 'black' : 'red'
            },
        });
    }
    */

    // render method
    render() {
        const { text, style } = this.state;
        console.log('2. ->' + this.getName() + 'render')
        return (
            <div>
                <textarea
                    id="textAreaComponent"
                    value={text}
                    onChange={this.onTextChange}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    style={style}
                />
                <h3>{text.length}</h3>
            </div>
        );
    }
    /*
    render() {
        const style = 'style' in this.state ? this.state.style : this.props.style;
        const text = 'defaultValue' in this.state ? this.state.defaultValue : this.props.defaultValue;
        return (
            <div>
                <textarea id="textAreaComponent"
                    defaultValue={text}
                    onChange={event => this.onTextChange(event)}
                    onMouseOver={event => this.onMouseOver(event)}
                    onMouseOut={event => this.onMouseOut(event)}
                    style={style}
                >
                    {this.state.defaultValue}
                </textarea>
                <h3>{text.length}</h3>
            </div>
        );
    }
    */
}

TextAreaComponent.defaultProps = {
    value: 'Count me as I type',
    style: { color: 'black' },
};

TextAreaComponent.propTypes = {
    value: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
};

export default TextAreaComponent;