import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TestPage extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
    }

    handleSubmit(event) {
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                
            </div>
        );
    }
}

function mapStateToProps(state) {
}

const connectedTestPage = connect(mapStateToProps)(TestPage);
export { connectedTestPage as TestPage };