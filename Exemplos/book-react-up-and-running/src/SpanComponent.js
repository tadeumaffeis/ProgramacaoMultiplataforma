
class SpanComponent extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    onMouseOver(event) {
        this.setState({
            style: { border: '1px solid red' },
        });
    }

    onMouseOut(event) {
        this.setState({
            style: { border: '1px solid black' },
        });
    }

    render() {
        return <span
            style={style}
            onMouseOver={this.onMouseOver(event)}
            onMouseOut={this.onMouseOut(event)}
        >
            {text}
        </span>;
    }
}

SpanComponent.defaultProps = {
    text: 'Default Text',
    style: { border: '1px solid black' },
};