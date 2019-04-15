import React from 'react';
import BgImg from "../assets/table.jpg";

class Winner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        // declare methods here
    }

    componentDidMount() {

    }


    render() {

        const bg = {
            background: `url(${BgImg}) no-repeat center center fixed`,
            height: "100vh",
            width: "100vw",
            color: "white"
        };

        return(
            <React.Fragment>

                <div className="container-fluid" style={bg}>
                    <h1 className="text-center">Congratulations {this.props.winner.toUpperCase()}!</h1>

                    <div className="row mx-auto">
                        <button className="btn btn-lg btn-primary" onClick={this.props.newGame}>New Game</button>
                        <button className="btn btn-lg btn-success" onClick={this.props.replay}>Re-match</button>
                    </div>
                </div>
                {/*<div>lol winner {this.props.winner} {this.props.winScore} - {this.props.loseScore}</div>*/}


            </React.Fragment>
        );
    }

}

export default Winner;