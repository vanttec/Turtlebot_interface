// @flow
import * as React from 'react';
import logo from '../arm.svg';
import Roboboat from './Roboboat'
import ROSLIB from'roslib';
type Props = {

}
//Declara tipo de dato en state de App
type State = {
  connected: boolean,
  error: ?React.Element<*>,
  url: string,
}
//Inicializa variables en constructor(state)
class App extends React.Component<Props, State> {
  state = {
    connected: false,
    error: undefined,
    url: "ws://localhost:9090",
  }

  ros = null
//Cuando se quiera cambiar la cariable url string
  handleChange = (event: {target: {value: string}}) => {
    this.setState({url: event.target.value});
  }

  handleConnect = () => {
    //Intenta conectar
    try {
      this.ros = new ROSLIB.Ros({
          url : this.state.url,
        });
      //Si se conecta, actualizar variable connected
      if (this.ros) this.ros.on('connection', () => {
        this.setState({
            connected: true,
        });
      });
      //No se conecta, desplegar error y actualizar variable "undefined" the error en state
      if (this.ros) this.ros.on('error', (error) => {
        console.log(error)
        this.setState({
          error: (
            <div style={{color: "rgb(161, 55, 55)", margin: 5}}>
              <div>Unable to establish connection to rosbridge server</div>
            </div>
          ),
        });
      });
    } catch (e) {
      console.log("Failed to create ros instance", e)
      this.setState({
        error: (
          <div style={{color: "rgb(161, 55, 55)", margin: 5}}>
            <div>{e.message}</div>
          </div>
        ),
      });
    }
  }

  render() {
    var x = "";
    if (this.state.connected) {
        console.log('You are in!')
        x = (
          <div className="App">
            <Roboboat ros={this.ros} />
          </div> 
      );
    } else {
        x = (
            <div className="App">
                <div className="AppHeader">
                  <img src={logo} className="Logo" alt="logo" />
                  <h2>Welcome to Roboboat interface</h2>
                </div>
                <div className="AppMain">
                  <h2>Connect to url</h2>
                  <input type="url" name="url" value={this.state.url} onChange={this.handleChange}/>
                  <button onClick={this.handleConnect} value="Connect">
                    Connect
                  </button>
                  {this.state.error}
                </div>
            </div>

        );
    }

    return x;
  }
}

export default App;