document.getElementById("add-btn").addEventListener('click',function(){
let myInputValue=document.getElementById("my-input").value;
if(myInputValue.trim()===""){
  alert("youn must write something");
 
}else{
  createNewTodoItem(myInputValue);
}});

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