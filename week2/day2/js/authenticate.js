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
document.getElementById("loader").style.display = "none";

async function contractCall(functionName,args,amount){
  client = await Ae.Aepp();
  let contract = await client.getContractInstance(contractSource,{contractAddress});
  let response = await contract.call(functionName,args,{amount:amount}).catch(err=>console.error(err));
  return response;
}
  

document.getElementById("have-account").addEventListener("click", async function(){
  window.location.href="./todo.html";
})

document.getElementById("create-account").addEventListener("click",async function(){
  document.getElementById("loader").style.display = "block";
  let initializeList = await contractCall('initializeList',[],0);
  document.getElementById("loader").style.display = "none";
  window.location.href = "./todo.html";
})