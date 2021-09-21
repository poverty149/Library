
let myLibrary=[];
class Book{
    constructor(
        title="Unknown",
        pages='0',
        author='Unknown',
        isread=false,
    )
    {
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.isread=isread;

    }
}

const addBookToLibrary=(e)=>{
    e.preventDefault()
    const newBook=getBookInput()
    addBookform.reset()
    if(!(myLibrary.some((book)=>book.title===newBook.title))){
        myLibrary.push(newBook);
    }
    
    
    saveLocal()
    UpdateBookCard()
    closeaddBookModal()
    

}
const tempBook=new Book();
const createBookCard=(book)=>{
    const bookcard=document.createElement("div")
    const title=document.createElement("h3")
    const author=document.createElement("h3")
    const pages=document.createElement("h3")
    const readButton=document.createElement("button")
    const removebtn=document.createElement("button")
    
    bookcard.classList.add("book-card")
    removebtn.classList.add("btn-mustard")
    removebtn.classList.add("btn")
    bookcard.classList.add("bookcard")
    readButton.classList.add("btn")
    readButton.onclick=toggleRead
    removebtn.onclick=removeBook
    
    title.textContent=`"${book.title}"`
    author.textContent=book.author
    pages.textContent=book.pages
    removebtn.textContent="Remove"
    if(book.isread){
        readButton.textContent="Read"
        readButton.classList.add('btn-light-green')
        readButton.classList.remove('btn-light-red')
    }else{
        readButton.textContent="Not Read"
        readButton.classList.remove('btn-light-green')
        readButton.classList.add('btn-light-red')
    }


    bookcard.appendChild(title)
    bookcard.appendChild(author)
    bookcard.appendChild(pages)
    bookcard.appendChild(readButton)
    bookcard.appendChild(removebtn)
    booksGrid.appendChild(bookcard)


}
const toggleRead=(e)=>{
    const title=e.target.parentNode.firstChild.innerHTML.replaceAll('"','')
    const book=myLibrary.find((book)=>book.title===title)
    book.isread=!book.isread;
    saveLocal()
    UpdateBookCard()

    
}
const removeBook=(e)=>{
    const title=e.target.parentNode.firstChild.innerHTML.replaceAll('"','')
    console.log(title)
    myLibrary=myLibrary.filter((book) =>book.title!==title)
    UpdateBookCard()
    saveLocal()
}
// const saveLocal {}
getBookInput=()=>{
    const title=document.getElementById("title").value
    const author=document.getElementById("author").value
    const pages=document.getElementById("pages").value
    const isread=document.getElementById("isread").checked
    return new Book(title,author,pages,isread)
}
const accountBtn = document.getElementById('AcntBtn')
const accountModal=document.getElementById("accountModal")
const booksGrid=document.getElementById("booksGrid")
const loggedOut=document.getElementById("loggedOut")
const loggedIn=document.getElementById('loggedIn')
const addBookBtn=document.getElementById('addBookBtn')
const addBookform=document.getElementById('addBookform')
const addBookModal=document.getElementById('addBookModal')
const loadingRing=document.getElementById('loadingRing')
const submitForm=document.getElementById('submitForm')
const logInBtn=document.getElementById('LogInBtn')
const logOutBtn=document.getElementById('LogoutBtn')
const overlay=document.getElementById('overlay')
const setupNavBar=(user)=>{
    if(user){
        loggedOut.classList.remove('active')
        loggedIn.classList.add('active')

    }else{
        loggedOut.classList.add('active')
        loggedIn.classList.remove('active')

    }
    loadingRing.classList.remove('active')

}
const setupAccountModal = (user) => {
    
      accountModal.innerHTML = "Welcome!"
    
    
  }
const openaddBookModal=()=>{
    //addBookform.reset()
    addBookModal.classList.add('active')
    overlay.classList.add('active')

   
    

}
const closeaddBookModal=()=>{
    addBookModal.classList.remove('active')
    overlay.classList.remove('active')
}
const SignIn=()=>{
    setupNavBar(1)
}
const SignOut=()=>{
    
    setupNavBar(0)
    
}
const openAccountModal=()=>{
    accountModal.classList.add('active')
    overlay.classList.add('active')
}
const closeallModal=()=>{
    addBookModal.classList.remove('active')
    accountModal.classList.remove('active')
    overlay.classList.remove('active')
}
//accountBtn.onclick=openAccountModal
addBookBtn.onclick=openaddBookModal
addBookform.onsubmit=addBookToLibrary
logInBtn.onclick=SignIn
logOutBtn.onclick=SignOut
overlay.onclick=closeallModal
accountBtn.onclick=openAccountModal
setupNavBar()
setupAccountModal()
const resetBookCards=()=>{
    booksGrid.innerHTML=''
}
const UpdateBookCard=()=>{
    resetBookCards()
    for(i=0;i<myLibrary.length;i++){
        createBookCard(myLibrary[i])
    }
}
const saveLocal=()=>{
    localStorage.setItem('myLibrary',JSON.stringify(myLibrary))
}