import React,{Component} from 'react';
import "./App.css";
class App extends Component{

  state={
    isSignUp:true
  }
  
inputChangedHandler=(event)=>{
  
  this.setState({text:event.target.value});
}

switchHandler=(event)=>{
  this.setState({isSignUp:!this.state.isSignUp});
}

  render(){
    return(<div className="App">
        {this.state.isSignUp? <input className="Input" placeholder="name"></input>  : null }
          
          <input className="Input" placeholder="email"></input>
          <input className="Input" placeholder="password"></input>

          <p onClick={this.switchHandler}>{this.state.isSignUp?"Switch to sign in":"Switch to sign up"}</p>
            </div>)
  }
} 
export default App;