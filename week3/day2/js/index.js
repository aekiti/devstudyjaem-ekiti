const contractSource=`
contract BookLibrary=

  record book = {
    title:string,
    author:string,
    image:string,
    url:string }
    
  record state = {
    books:map(string,book),
    totalBookCount:int,
    librarian:address }

  entrypoint init() = {
    books={},
    totalBookCount=0,
    librarian = Call.caller }

  function requirement(exp : bool, err : string) =
    if(!exp)
        abort(err)

  entrypoint onlylibrarian() : bool =
    requirement(state.librarian ==ak_2FuPqTvcRSQaPznxboDKSQRJUpmBUGJz7nrWV1CmySbAf2FsDE, "Not Authorized")
    true

  entrypoint getTotalBookCount()=
    state.totalBookCount
  
  stateful entrypoint addBook(title':string, author':string, image':string, url':string, isbn:string) =
    onlylibrarian()
    let newBook = {title=title',author=author',image=image', url=url'}
    let index = getTotalBookCount() + 1
    put(state{books[isbn]=newBook,totalBookCount=index})
    
  entrypoint getBook(isbn)=
    state.books[isbn]
    
  entrypoint getAllBooks()=
    state.books
`;
const contractAddress="ct_2RmQ7VL4Ff4Gx6zo1415aErQgC3ZZuJWqGvHxK7zBRD7xeRJow";

let client = null, contractInstance = null, allBooks, bookArray = [], totalBook = 0;

function renderBooks() {
  let bookCard = $('#bookCard').html();
  Mustache.parse(bookCard);
  let rendered = Mustache.render(bookCard, {bookArray});
  $('#allBooks').html(rendered);
}

window.addEventListener('load', async () => {
  client = await Ae.Aepp();
  contractInstance = await client.getContractInstance(contractSource, {contractAddress});
  totalBook = (await contractInstance.methods.getTotalBookCount()).decodedResult;
  document.getElementById("totalBooks").innerHTML = '(' + totalBook + ')';

  allBooks = (await contractInstance.methods.getAllBooks()).decodedResult;

  for (let i in allBooks) {
    const book = allBooks[i]

    bookArray.push({
      bookImage: book[1]['image'],
      bookTitle: book[1]['title'],
      bookAuthor: book[1]['author'],
      bookIsbn: book[0],
      bookUrl: book[1]['url'],
    })
  }

  renderBooks();
  $("#loader").hide();
});

$('#add-book').click(async function(){
  $("#loader").show();
  const title = ($('#btitle').val()),
        author = ($('#bauthor').val()),
        image = ($('#bimage').val()),
        isbn = ($('#bisbn').val()),
        url = ($('#burl').val());

  await contractInstance.methods.addBook(title, author, image, url, isbn)
  .catch(function(error) {
    console.log(error)
    stop();
  })
  .then(function() {
    location.reload();
  });
});