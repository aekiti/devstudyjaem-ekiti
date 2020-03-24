let isOpen=false;
function toggleNavBar(){
  console.log("clicked");
  if(isOpen){
    isOpen=false;
    document.getElementById("header-options").classList.remove("open-nav");
    document.getElementById("header-options").classList.add("close-nav");
  }else{
    isOpen=true;
    document.getElementById("header-options").classList.remove("close-nav");
    document.getElementById("header-options").classList.add("open-nav");
  }
}
document.getElementById("nav-toggle").addEventListener("click",toggleNavBar);
document.getElementById("addBook").addEventListener("click",toggleNavBar);
document.getElementById("viewBooks").addEventListener("click",toggleNavBar);

let contractInstance=null;
let client=null;
let bookPicture=null;
let ipfs=null;

let contractAddress="ct_tAijF6fE3ZL1uDy5CxbfFmipC5sH9DAGqdN9FhiWcMjEQSVng";
let contractSource=`
contract BookLibraryContract=
  record bookInfo={
    name:string,
    isbn:string,
    date:string,
    ipfsHash:string
    }

  record state={
    bookLibrarian: map(address,list(bookInfo))
    }

  stateful entrypoint init()={bookLibrarian={}}

  stateful entrypoint registerBook(name':string,isbn':string,date':string, ipfsHash':string)=
    let usersListOfBooks=Map.lookup_default(Call.caller,state.bookLibrarian,[])
    let newBookInfo={name=name',isbn=isbn',date=date',ipfsHash=ipfsHash'}
    let newListOfBooks=newBookInfo::usersListOfBooks
    put(state{bookLibrarian[Call.caller]=newListOfBooks})

  entrypoint getUsersListOfBooks()=
    Map.lookup_default(Call.caller,state.bookLibrarian,[])
`;

document.getElementById("input-image").addEventListener("change",function(event){
  bookPicture=event.currentTarget.files[0];
  console.log(bookPicture);
})

window.addEventListener('load',async function(){
  ipfs=await new IPFS({host:'ipfs.infura.io',port:5001,protocol:'https'});
  console.log(ipfs);
  client=await Ae.Aepp();
  contractInstance=await client.getContractInstance(contractSource,{contractAddress});
  let allBooks=(await contractInstance.methods.getUsersListOfBooks()).decodedResult;
  document.getElementById("loader").style.display="none";
  console.log(allBooks,"all books");
  allBooks.map(book=>{
    axios.get(`https://ipfs.io/ipfs/${book.ipfsHash}`).then(function(result){
      addBookToDom(book.name,book.isbn,result.data);
    }).catch(function(error){
      console.error(error)
    }) 
  });
});

async function handleSubmitBook(){
  let title=document.getElementById("input-title").value;
  let isbn=document.getElementById("input-isbn").value;
  let date=document.getElementById("input-date").value;

  if(title.trim()!=""&&isbn.trim()!=""&&date.trim()!=""&&bookPicture!=null){
    document.getElementById("loader").style.display="block";
    let reader=new FileReader();
    reader.onloadend= async function(){
      ipfs.add(reader.result, async function(err,res){
        if(err){
          console.error(err);
          return;
        }
        console.log(res);
        axios.get(`https://ipfs.io/ipfs/${res}`).then(async function(result){
          await contractInstance.methods.registerBook(title,isbn,date,res);
          document.getElementById("loader").style.display="none";
          addBookToDom(title,isbn,result.data);
        }).catch(function(error){
          document.getElementById("loader").style.display="none";
          console.error(error);
        })
      })   
      console.log(reader.result);
    }
    reader.readAsDataURL(bookPicture);
  }
}

document.getElementById("submit-book").addEventListener("click",handleSubmitBook);

function addBookToDom(title,isbn,imageData){
  let allBooks=document.getElementById("list-books-section");

  let bookTextDiv=document.createElement("div");

  let bookCover=document.createElement("img");
  bookCover.src=imageData;
  let newBookDiv=document.createElement("div");
  newBookDiv.classList.add("book");

  let bookTitleParagraph=document.createElement("p");
  bookTitleParagraph.innerText=title;

  let bookISBNParagraph=document.createElement("p");
  bookISBNParagraph.innerText=isbn;

  bookTextDiv.appendChild(bookTitleParagraph);
  bookTextDiv.appendChild(bookISBNParagraph);

  allBooks.appendChild(bookCover);
  allBooks.appendChild(bookTextDiv);
}
