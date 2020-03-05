import React from 'react';
import "./UpdateProfile.css";
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import BackDrop from '../UI/Backdrop/Backdrop';
import {ipfs,base64ArrayBuffer} from '../../HelperFiles/ipfs';
import buffer from 'buffer';
import {connect} from 'react-redux';
import { stat } from 'fs';

class UpdateProfile extends React.Component{

    state={
        name:'',
        discipline:'',
        status:'',
        file:null,
        showLoader:false
    }


    handleSubmit=()=>{

        let {name}=this.state;
        let {status}=this.state
        let {discipline}=this.state;
        let {file}=this.state;
        console.log(file.type);
        if(name.trim()!=""&&status.trim()!=""&&discipline.trim()!=""&&file!=null){
         this.setState({showLoader:!this.state.showLoader});   
         let imageHash= this.addFileToIpfs(file);   
            
        }

        
     
    }



    addFileToIpfs=async (file)=>{
        console.log(ipfs,"ipfs");
        const fileType = file.type;
        console.log(fileType);
        const prefix = `data:${fileType};base64,`;
        let reader= new window.FileReader();
        reader.readAsArrayBuffer(file);
        let myResult="";
        reader.onloadend=()=>{
          ipfs.add(prefix+base64ArrayBuffer(Buffer(reader.result)),async (err,result)=>{
            if(err){
              console.log(err);
              return;
            }
            myResult=result;
            console.log(result,"Am hashz");
            await this.props.client.call("registerProfile",[this.state.name,this.state.discipline,this.state.status,result])
            this.setState({showLoader:!this.state.showLoader});   
         
        return result
          });
        console.log(reader.result)

        }
       
      }


    nameChangedHandler=(event)=>{
    this.setState({name:event.target.value})
    console.log(this.state.name);
    }
    disciplineChangedHandler=(event)=>{
    this.setState({discipline:event.target.value})
    }

    statusChangedHandler=(event)=>{
     
    this.setState({status:event.target.value});
    }
    fileChangedHandler=(event)=>{
    this.setState({file:event.target.files[0]});
    console.log(event.target.files[0])
    }

    render(){
        return(<div className={"UpdateProfile"} >
            
                <BackDrop show={this.state.showLoader}></BackDrop>
               {this.state.showLoader?  <Spinner></Spinner>:null}
            <input  onChange={this.fileChangedHandler} placeHolder="Choose Your Profile Picture" otherClass={"UPInput"}  type="file"  style={{ width:"40%",
                                            display:"block",
                                            margin: "0 auto",
                                            background: "#f7296e",
                                            borderRadius:"10px",
                                            height: "40px",
                                            color:"white",
                                            fontWeight: "bold",
                                            border:"none",
                                            cursor: "pointer"}}/>
            <Input value={this.state.name} onChange={this.nameChangedHandler} placeHolder="Enter Your Name"  otherClass={"UPInputi"}/>
            <Input value={this.state.discipline} onChange={this.disciplineChangedHandler} placeHolder="Enter Your Discipline" otherClass={"UPInputii"}/>
            <Input value={this.state.status} onChange={this.statusChangedHandler} placeHolder="Enter Your Status" otherClass={"UPInputiii"} />
           
            <Button otherClass={"UPInputiv"} clicked={this.handleSubmit}>Submit</Button>
         
        </div>);
    }
}

const mapStateToProps=(state)=>{
    return{
        client:state.client
    }
}
export default connect(mapStateToProps)(UpdateProfile);