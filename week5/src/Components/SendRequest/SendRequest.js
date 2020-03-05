import React,{Component} from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './SendRequest.css';
class SendRequest extends Component{
   render(){ 
       return(
            <div className="SendRequest">
                <Input></Input>
               <div className="SendRequestButton">

               <Button>Send Request</Button>
               <div className="div-space"> 
                    <Button clicked={this.props.backHandler}>Back</Button>
               </div>

               </div>
            </div>
        );
   }
 }

 export default SendRequest;