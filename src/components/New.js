import React from 'react';
import BgImg from '../assets/table.jpg';
import Paddle from '../assets/paddle.png';


class New extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            p1: null,
            p2: null,
            server: null
        };
        // declare methods here
        this.namePlayer = this.namePlayer.bind(this);
        this.changeServer = this.changeServer.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    // methods
    namePlayer = (e) => {
        const player = e.target.id;
        const name = e.target.value;
        this.setState({[player]: name});
        // this.props.namePlayer(player, name);
        // console.log(`namePlayer(${player}, ${name})`);
    };

    changeServer = (e) => {
        const server = e.target.value;
        this.setState({server: server});
    };

    startGame = () => {
        if (this.state.p1 && this.state.p2 && this.state.server) {
            const p1 = this.state.p1;
            const p2 = this.state.p2;
            const server = this.state.server;
            this.props.startGame(p1, p2, server);
        } else {
            console.log(`*** j00 n33d m04r inf0r -- p1 ${this.state.p1} -- p2 ${this.state.p2} -- server ${this.state.server} ***`);
        }
    };

    render() {

        // style
        const bg = {
            background: `url(${BgImg}) no-repeat top left fixed`,
            backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
            color: "white"
        };
        const half = {
            width: "75%"
        };
        const paddlePic = {
            maxWidth: "10vh",
            padding: "0 10px"
        };

        return(
            <React.Fragment>
                <div style={bg} className="container-fluid">
                    <h1 className="text-center my-3 pt-2">New Game</h1>

                    {/*form*/}
                    <div className="row">

                        {/*P1 Name*/}
                        <div className="col-6 mb-2">
                            <h2 className="text-center">Player 1</h2>
                            <div className="form-group mx-auto" style={half}>
                                {/*<label htmlFor="exampleInputEmail1">Name</label>*/}
                                <input type="text" className="form-control" id="p1"  placeholder="Enter Name" onChange={this.namePlayer} />
                            </div>

                        </div> {/*end P1 Name*/}

                        {/*P2 Name*/}
                        <div className="col-6 mb-2">
                            <h2 className="text-center">Player 2</h2>
                            <div className="form-group mx-auto" style={half}>
                                {/*<label htmlFor="exampleInputEmail1">Name</label>*/}
                                <input type="text" className="form-control" id="p2"  placeholder="Enter Name" onChange={this.namePlayer} />
                            </div>
                        </div>{/*end P2 Name*/}

                        {/*service*/}
                        <div className="col-8 d-block text-center mx-auto my-4" style={{border: "2px solid black"}}>
                            <h2><strong>Who Serves First?</strong></h2>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="server" id="p1serve" value="p1" onChange={this.changeServer} />
                                    <label className="form-check-label" htmlFor="p1serve">
                                        <strong>Player 1</strong>
                                    </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="server" id="p2serve" value="p2" onChange={this.changeServer} />
                                    <label className="form-check-label" htmlFor="p2serve">
                                        <strong>Player 2</strong>
                                    </label>
                            </div>
                        </div>{/*end service*/}

                        {/*button*/}
                        <div className="col-12 text-center">
                            <img src={Paddle} className="align-middle" style={paddlePic} alt="ping pong" />
                            <button className="btn btn-lg btn-success align-middle" onClick={this.startGame}>Start</button>
                            <img src={Paddle} className="align-middle" style={paddlePic} alt="ping pong" />
                        </div>
                        {/*end button*/}

                    </div>{/*end form*/}

                </div>{/*end container-fluid*/}
            </React.Fragment>
        );
    }

}

export default New;