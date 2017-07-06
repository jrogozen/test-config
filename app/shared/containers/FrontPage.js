import React from 'react';

import './FrontPage.scss';

class FrontPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalClicks: 0
        };
    }
    render() {
        return (
            <div className="FrontPage">
                FrontPage!

                <button
                    onClick={() => this.setState({ totalClicks: this.state.totalClicks + 1})}
                >
                        Click Me
                </button>

                <div className="FrontPage-clicks">
                    Total Clicks: {this.state.totalClicks}
                </div>
            </div>
        )
    }
}

export default FrontPage;
