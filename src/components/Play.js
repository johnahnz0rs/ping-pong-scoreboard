import React from 'react';
import BgImg from '../assets/table.jpg';
import Paddle from '../assets/paddle.png';
import Left from '../assets/arrow-left.png';
import Right from '../assets/arrow-right.png';

class Play extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            p1: null,
            p2: null,
            score1: 0,
            score2: 0,
            totalScore: 0,
            server: null
        };
        // declare methods here
        this.increaseScore = this.increaseScore.bind(this);
        this.checkEndGame = this.checkEndGame.bind(this);
        this.checkServer = this.checkServer.bind(this);
    }

    componentDidMount() {
        const p1 = this.props.p1;
        const p2 = this.props.p2;
        const server = this.props.server;
        this.setState({
            p1: p1,
            p2: p2,
            server: server
        });
    }

    // methods

    // increment score
    increaseScore = (e) => {

        // variables
        const player = e.target.id;
        let game = {...this.state};

        // increment score and totalScore
        (player === 'p1') ? game.score1++ : game.score2++;
        game.totalScore++;

        // check for Win
        this.checkEndGame(player, game.score1, game.score2);

        // check for change of service
        // assumes game did not end
        const newServer = this.checkServer(game.score1, game.score2, player, game.server, game.totalScore);
        if (newServer) {
            game.server = newServer;
        }

        // setState
        if (player === 'p1') {
            this.setState({
                score1: game.score1,
                totalScore: game.totalScore,
                server: game.server
            });
        } else {
            this.setState({
                score2: game.score2,
                totalScore: game.totalScore,
                server: game.server
            });
        }
    };

    // checks if there's a winner
    checkEndGame = (scorer, score1, score2) => {

        if (score1 >= 21 && scorer === 'p1') {
            if (score1 - score2 >= 2) { // win by 2
                this.props.winner('p1', score1, score2);
            }
        } else if (score2 >= 21 && scorer === 'p2') {
            if (score2 - score1 >= 2 ) { // win by 2
                this.props.winner('p2', score2, score1);
            }
        }
    };

    // checks for change of service
    checkServer = (score1, score2, scorer, server, totalScore) => {
        // if either score is over 21
        if (score1 >= 21 || score2 >= 21) {
            if (server === 'p1') {
                if (score1 > score2) {
                    return 'p2'
                }
            } else {
                if (score2 > score1) {
                    return 'p1';
                }
            }
        } else { // if scores are under 21
            // if 5 serves have passed, then change server
            if (totalScore % 5 === 0) {
                if (server === 'p1') {
                    return 'p2';
                } else {
                    return 'p1';
                }
            } else { // else no change of service
                return null;
            }
        }
    };


    render() {

        const bg = {
            background: `url(${BgImg}) no-repeat center center fixed`,
            height: "100vh",
            width: "100vw",
            color: "white"
        };
        const paddlePic = {
            maxHeight: "12vh"
        };
        const arrowPic = {
            maxHeight: "8vh"
        };
        const playerName = {
            // color: "white",
            fontWeight: "bold"
        };
        const score ={
            fontSize: "30vh",
            color: "black",
            fontWeight: "bold"
        };

        const ppsbHeader = {
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
            position: "absolute"
        };

        const playerButton = {
            width: "100vw",
            height: "100vh"
        };

        return(

            <React.Fragment>

                <div className="container-fluid">
                    <div className="row" style={bg}>

                        {/*header: PING PONG*/}
                        <div className="container mt-1">
                            <div className="row">
                                <div className="col"></div>
                                <div className="col-6">
                                    <h2 style={ppsbHeader} className="text-center">PING PONG SCOREBOARD</h2>
                                </div>
                                <div className="col"></div>
                            </div>
                        </div>{/*end PING PONG header*/}

                        {/*P1*/}
                        <button className="btn btn-lg col-6" id="p1" style={playerButton} onClick={this.increaseScore}>
                            <h2 id="p1" style={playerName} className="text-center">{this.state.p1}</h2>
                            <p id="p1" className="text-center" style={score} id="p1">{this.state.score1}</p>

                            {/*P1 Serving*/}
                            {this.state.server === 'p1' &&
                            <div id="p1" className="col-12 text-center">
                                <img id="p1" src={Paddle} alt="serve" style={paddlePic} name="p1" />
                                <span id="p1" style={playerName}> {this.state.p1.toUpperCase()} IS SERVING</span>
                                <img id="p1" src={Right} alt="right arrow" style={arrowPic} name="p1" />
                            </div>
                            }
                            {/*end P1 Serving*/}
                        </button>{/*end P1*/}

                        {/*P2*/}
                        <button className="btn btn-lg col-6" id="p2" style={playerButton} onClick={this.increaseScore}>
                            <h2 style={playerName} id="p2" className="text-center">{this.state.p2}</h2>
                            <p className="text-center" id="p2" style={score}>{this.state.score2}</p>

                            {/*P2 Serving*/}
                            {this.state.server === 'p2' &&
                            <div className="col-12 text-center" id="p2">
                                <img id="p2" src={Left} alt="left arrow" style={arrowPic} />
                                <span id="p2" style={playerName}> {this.state.p2.toUpperCase()} IS SERVING </span>
                                <img id="p2" src={Paddle} alt="serve" style={paddlePic} />
                            </div>
                            } {/* end P2 Serving*/}
                        </button>{/*end P2*/}

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Play;