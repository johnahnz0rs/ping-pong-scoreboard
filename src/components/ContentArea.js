import React from 'react';
import New from './New';
import Play from './Play';
import Winner from './Winner';

class ContentArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // display toggle
            page: 'play', // new, play, winner
            // setup
            p1: "jahn",
            p2: "dong disco",
            server: "p1",
            // play screen
            score1: null,
            score2: null,
            // win screen
            winner: null, //holds winnerName
            winScore: null,
            loseScore: null
        };
        //declare methods here
        // new game screen
        this.namePlayer = this.namePlayer.bind(this);
        this.changeServer = this.changeServer.bind(this);
        this.startGame = this.startGame.bind(this);
        // play screen
        this.newGame = this.newGame.bind(this);
        this.winner = this.winner.bind(this);
        // winner screen
        this.replay = this.replay.bind(this);
    }

    componentDidMount() {
        // onInit
    }

    // new game screen methods
    namePlayer = (player, name) => this.setState({[player]: name});
    changeServer = (server) => this.setState({server: server});
    startGame = (p1, p2, server) => {
        this.setState({
            p1: p1,
            p2: p2,
            server: server
        }, () => this.setState({page: 'play'}));
    };

    // play screen methods
    newGame = () => {
        this.setState({
            p1: null,
            p2: null,
            server: null,
            score1: null,
            score2: null,
            winner: null,
            winScore: null,
            loseScore: null
        }, () => {
            this.setState({page: 'new'});
        });
    };

    winner = (player, winScore, loseScore) => {
        const winnerName = (player === 'p1') ? this.state.p1 : this.state.p2;

        this.setState({
            winner: winnerName,
            server: player,
            winScore: winScore.toString(),
            loseScore: loseScore.toString()
        }, () => {
            this.setState({page: 'winner'});
        });
    };

    // winner screen methods
    replay = () => this.setState({page: 'play'});




    // template views
    render() {

        return(
            <React.Fragment>

                {/*new screen*/}
                {this.state.page === 'new' &&
                    <New startGame={this.startGame} />
                }
                {/*play screen*/}
                {this.state.page === 'play' &&
                    this.state.p1 &&
                    this.state.p2 &&
                    this.state.server &&
                    <Play p1={this.state.p1}
                          p2={this.state.p2}
                          server={this.state.server}
                          newGame={this.newGame}
                          winner={this.winner}
                    />
                }
                {/*winner screen*/}
                {this.state.page === 'winner' &&
                    this.state.winner &&
                    this.state.winScore &&
                    this.state.loseScore &&
                    <Winner winner={this.state.winner}
                            winScore={this.state.winScore}
                            loseScore={this.state.loseScore}
                            newGame={this.newGame}
                            replay={this.replay}
                    />
                }
            </React.Fragment>
        );
    }



}


export default ContentArea;