const contractAddress="ct_bLCJpF4p5CjLMwVyWyxM3zhFqWKz2NnLXpQQBfVTP8pvvikrL" ;
const contractSource=`
payable contract MemeVote=
  record meme = {
    name:string,
    url:string,
    creatorAddress:address,
    voteCount:int }

  entrypoint init() = {
    memes={},
    totalVoteCount=0 }
  
  record state = {
    totalVoteCount:int,
    memes:map(int,meme) }
  
  stateful entrypoint registerMeme(name':string, url':string) =
    let newMeme = {name=name',url=url',creatorAddress=Call.caller,voteCount=0}
    let index = getTotalVoteCount() + 1
    put(state{memes[index]=newMeme,totalVoteCount=index})
        
  entrypoint getTotalVoteCount()=
    state.totalVoteCount
    
  entrypoint getMeme(index)=
    state.memes[index]
    
  entrypoint getAllMemes()=
    state.memes
    
  payable stateful entrypoint voteMeme(index:int)=
    let selectedMeme=getMeme(index)
    Chain.spend(selectedMeme.creatorAddress,Call.value)
    let selectedMemeVoteCount=selectedMeme.voteCount+Call.value
    let votedMeme=selectedMeme{voteCount=selectedMemeVoteCount}
    put(state{memes[index]=votedMeme})
`

let myArr;
let client=null

document.getElementById("register-meme").addEventListener("click", async function(){
  let value=document.getElementById("url-input").value;
  if(value==""){
    return;
  }else{
    document.getElementById("loader").style.display="block";
    await contractCall("registerMeme",["name",value],0);
    document.getElementById("loader").style.display="none";
    myArr.push([myArr.length,{"creatorAddress":"ak_2bKhoFWgQ9os4x8CaeDTHZRGzUcSwcXYUrM12gZHKTdyreGRgG","name":"name","url":value,"voteCount":0}]);
    createNewMeme(myArr.length-1);
  }
});

async function windowsLoaded() {
  client=await Ae.Aepp();
  myArr= await callStatic('getAllMemes',[]);
  console.log(myArr);
  document.getElementById("loader").style.display="none";
  for(let i in myArr){
    console.log(myArr[i]);
    let allMemes=document.getElementById("all-memes");

    let individualMeme=document.createElement("div");
    individualMeme.classList.add("individual-meme");

    let voteCountParagraph=document.createElement('p');
    voteCountParagraph.innerText='Votecount :'+ myArr[i][1]['voteCount'];

    let memeImage=document.createElement('img');
    memeImage.src=myArr[i][1]['url'];

    let aeInput=document.createElement('input');
    aeInput.placeholder="Enter Meme url" 
    
    let voteButton=document.createElement('button');
    voteButton.innerText="Vote"
    voteButton.addEventListener('click', async function(){
      if(aeInput.value==""){
        return;
      }else{
        console.log(myArr[i][0]);
        document.getElementById("loader").style.display="block";
        await  contractCall("voteMeme",[myArr[i][0]],parseInt(aeInput.value)*1000000000000000000);
        document.getElementById("loader").style.display="none";
        myArr[i][1]['voteCount']=myArr[i][1]['voteCount']+parseInt(aeInput.value);
        voteCountParagraph.innerText='Votecount :'+ myArr[i][1]['voteCount']

      }
      console.log(myArr[i][0])
    });

    voteButton.classList.add('vote');

  
    individualMeme.appendChild(voteCountParagraph);
    individualMeme.appendChild(memeImage);
    individualMeme.appendChild(aeInput);
    individualMeme.appendChild(voteButton);
    allMemes.appendChild(individualMeme);
  }
}

window.addEventListener('load',windowsLoaded);

async function contractCall(func, args, value) {
  const contract = await client.getContractInstance(contractSource, {contractAddress});
  //Make a call to write smart contract func, with aeon value input
  const calledSet = await contract.call(func, args, {amount: value}).catch(e => console.error(e));

  return calledSet;
}

async function callStatic(func, args) {
    //Create a new contract instance that we can interact with
    const contract = await client.getContractInstance(contractSource, {contractAddress});
    //Make a call to get data of smart contract func, with specefied arguments
    const calledGet = await contract.call(func, args, {callStatic: true}).catch(e => console.error(e));
    //Make another call to decode the data received in first call
    const decodedGet = await calledGet.decode().catch(e => console.error(e));

    return decodedGet;
  }

function createNewMeme(i){
  console.log(myArr[i]);
  let allMemes=document.getElementById("all-memes");

  let individualMeme=document.createElement("div");
  individualMeme.classList.add("individual-meme");

  let voteCountParagraph=document.createElement('p');
  voteCountParagraph.innerText='Votecount :'+ myArr[i][1]['voteCount'];

  let memeImage=document.createElement('img');
  memeImage.src=myArr[i][1]['url'];

  let aeInput=document.createElement('input');
  aeInput.placeholder="Enter Meme url" 
  
  let voteButton=document.createElement('button');
  voteButton.innerText="Vote"
  voteButton.addEventListener('click', async function(){
    if(aeInput.value==""){
      return;
    }else{
      console.log(myArr[i][0]);
      document.getElementById("loader").style.display="block";
      await  contractCall("voteMeme",[i],parseInt(aeInput.value)*1000000000000000000);
      document.getElementById("loader").style.display="none";
      myArr[i][1]['voteCount']=myArr[i][1]['voteCount']+parseInt(aeInput.value);
      voteCountParagraph.innerText='Votecount :'+ myArr[i][1]['voteCount']

    }
    console.log(myArr[i][0])
  });
  voteButton.classList.add('vote');

  
  individualMeme.appendChild(voteCountParagraph);
  individualMeme.appendChild(memeImage);
  individualMeme.appendChild(aeInput);
  individualMeme.appendChild(voteButton);
  allMemes.appendChild(individualMeme);
}