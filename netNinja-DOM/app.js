const list = document.querySelector('#book-list ul');

//delete books
list.addEventListener('click', function(e){
    if (e.target.className == 'delete'){
        const li = e.target.parentElement;
        list.removeChild(li);
    }    
});


//add book-list
const addForm = document.forms['add-book'];

addForm.addEventListener('submit', function(e){
    e.preventDefault();
    const value = addForm.querySelector('input[type="text"]').value;
    
    //create elements
    const li = document.createElement('li');
    const bookName = document.createElement('span');
    const delBtn = document.createElement('span');

    li.appendChild(bookName);
    li.appendChild(delBtn);
    bookName.textContent = value;
    delBtn.textContent = 'delete';
    delBtn.classList.add('delete');
    bookName.classList.add('name');

    document.querySelector('#book-list ul').appendChild(li);
})

//checkbox event
const hideBox = document.querySelector('#hide');

hideBox.addEventListener('change', function(e){
    if(hideBox.checked){
        list.style.display = "none";
    }
    else{
        list.style.display = "initial";
    }
})

//search bar
const searchBar = document.forms['search-books'].querySelector('input');

searchBar.addEventListener('keyup',function(e){
    const term = e.target.value.toLowerCase();
    const books = list.getElementsByTagName('li');
    Array.from(books).forEach(element => {
        const bName = element.querySelector('.name').textContent.toLowerCase();
        if(bName.indexOf(term) != -1){
            element.style.display = "block";
        }
        else{
            element.style.display="none";
        }
    })
})

//tabbed content
const tabs = document.querySelector('.tab');
const panels = document.querySelectorAll('.panel');
tabs.addEventListener('click',function(e){
    if(e.target.tagName == 'LI'){
        const targetPanel = document.querySelector(e.target.dataset.target);
         panels.forEach((panel) => {
             if(panel == targetPanel){
                 panel.classList.add("active");
             }else{
                 panel.classList.remove('active');
             }
         })
    }
})