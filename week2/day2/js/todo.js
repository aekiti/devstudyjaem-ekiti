let contractAddress = "ct_ZnV3QMmxj5H34XTro9grHEPVGiHSjg2ag1TBN5dVtQ1ahk4hC"
let contractSource = `
contract TodoList=

  record state={
    users:map(address,list(string)) }

  stateful entrypoint init()={users={}}

  stateful entrypoint initializeList()=
    let newList=[]
    put(state{users[Call.caller]=newList})        

  stateful entrypoint addTodo(todo':string)=
    let oldList=state.users[Call.caller]
    let newList= todo'::oldList
    put(state{users[Call.caller]=newList})
      
  entrypoint getTodo()=
    state.users[Call.caller]
`;

let client = null;

async function contractCall(functionName,args,amount){
  let contract = await client.getContractInstance(contractSource,{contractAddress});
  let response = await contract.call(functionName,args,{amount:amount}).catch(err=>console.error(err));
  return response;
}

async function callStatic(functionName,args){
  let contract = await client.getContractInstance(contractSource,{contractAddress});
  let response = await contract.call(functionName,args).catch(err=>console.error(err));
  let decodedResponse = await response.decode().catch(e=>console.error(e));

  return decodedResponse;
}

async function windowsLoaded(){
  console.log("windows loaded");
  client = await Ae.Aepp();
  //  await contractCall('addTodo',['First to do'],0);
  let result=await callStatic('getTodo',[]);

  console.log(result);
  for(let i in result){
    console.log("Added");
    createNewTodoItem(result[i])
  }
  document.getElementById("loader").style.display = "none"
}

window.addEventListener('load',windowsLoaded);

document.getElementById("add-btn").addEventListener('click',async function(){
  document.getElementById("loader").style.display = "block";
  let myInputValue = document.getElementById("my-input").value;
  if(myInputValue.trim() === ""){
    alert("youn must write something");
    document.getElementById("loader").style.display="none";
  }else{
    console.log("Adding");
    
    await contractCall('addTodo',[myInputValue],0);
    createNewTodoItem(myInputValue);
    document.getElementById("loader").style.display="none";
  }
});

function removeItem(event){
  console.log(event);
  console.log(this.parentNode.parentNode);

  let myUl =this.parentNode.parentNode;
  myUl.removeChild(this.parentNode);
}

function createNewTodoItem(text){
  let myUl=document.getElementById("my-ul");
  let newItem=document.createElement('li');
  newItem.innerText=text;

  let myButton=document.createElement('button');
  myButton.addEventListener('click',removeItem)

  myButton.innerText="done"
  newItem.appendChild(myButton);
  myUl.appendChild(newItem);

  console.log(text);
}

