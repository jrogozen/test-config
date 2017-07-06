import React from 'react';

class FrontPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalClicks: 0
        };
    }
    render() {
        return (
            <div>
                FrontPage!

                <button
                    onClick={() => this.setState({ totalClicks: this.state.totalClicks + 1})}
                >
                        Click Me
                </button>

                <div>
                    Total Clicks: {this.state.totalClicks}
                </div>
            </div>
        )
    }
}

export default FrontPage;
