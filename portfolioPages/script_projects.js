const sectionHeaders = document.querySelectorAll('#section__header')


//######################################### Event Handlers
sectionHeaders.forEach(x=> x.addEventListener('click',headinghandler))



//######################################### Handler functions
function headinghandler(){
    this.classList.toggle('active')
    const id = this.dataset.id
    const tile = document.querySelector(`#tile${id}`)
    tile.classList.toggle('active')
    const symbol = this.querySelector('#symbol')
    symbol.textContent= symbol.textContent == "+" ? "-" : "+" 
}
