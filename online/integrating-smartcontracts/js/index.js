function togggleNavBar(){
  console.log("clicked");
  if(isOpen){
    isOpen=false;
    document.getElementById("header-options").classList.remove("open-nav"); 
    document.getElementById("header-options").classList.add("close-nav"); 
    console.log("open nav")
  }else{
    isOpen=true;
    console.log("close-nav")
    document.getElementById("header-options").classList.remove("close-nav"); 
    document.getElementById("header-options").classList.add("open-nav")  
  }
}
let isOpen=false;
document.getElementById("nav-toggle").addEventListener("click",togggleNavBar)
document.getElementById("addBook").addEventListener("click",togggleNavBar);
document.getElementById("bookList").addEventListener("click",togggleNavBar)

let client=null;
let contractAddress='ct_KYkLmd28GwkL6omTtjvCsXxdGcPsDEHgyr4nekFyAoPRr9DLm';
let contractSource=`
contract BookLibraryContract=
  record bookInfo={
    name:string,
    isbn:string,
    date: string
    }
  record state={
    listOfBooks:map(address,list(bookInfo))
    }

  stateful entrypoint init()={listOfBooks={}}

  stateful entrypoint registerBooks(name':string,isbn':string,date':string)=
    let newBook={name=name',isbn=isbn',date=date'}
    let bookList=Map.lookup_default(Call.caller,state.listOfBooks,[])
    let newBookList= newBook::bookList
    put(state{listOfBooks[Call.caller]=newBookList})
          
  entrypoint getBooks()=
    Map.lookup_default(Call.caller,state.listOfBooks,[])
`;
let contractInstance=null;

window.addEventListener('load',async()=>{
  client=await Ae.Aepp();
  contractInstance=await client.getContractInstance(contractSource,{contractAddress});
  console.log(contractInstance);
  let allBooks=  (await contractInstance.methods.getBooks()).decodedResult;
  console.log(allBooks);

  allBooks.map(el=>{
    createBook(el.name,el.isbn)
  });
  document.getElementById("loader").style.display="none";
})

async function handleSubmitClick(){
  let title=document.getElementById("input-title").value;
  let isbn=document.getElementById("input-isbn").value;

  if(title.trim()!=""&&isbn.trim()!=""){
    document.getElementById("loader").style.display="block";
    let result   =await contractInstance.methods.registerBooks(title,isbn,new Date().getTime()+"");
    console.log(title,result);
    createBook(title,isbn);
    document.getElementById("loader").style.display="none";
  }
}
document.getElementById("submit-book").addEventListener("click",handleSubmitClick);

function createBook(name,isbn){
  let parent=document.getElementById("all-books");
  let bookDiv=document.createElement("div");
  bookDiv.classList.add("book");

  let bookName=document.createElement("p");
  bookName.innerText=name;

  let bookISBN=document.createElement("p");
  bookISBN.innerText=isbn;

  bookDiv.appendChild(bookName);
  bookDiv.appendChild(bookISBN);
  parent.appendChild(bookDiv);
}