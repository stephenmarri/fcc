let sectionHeaders;
let listWrapper;


//######################################### Event Handlers
window.addEventListener('DOMContentLoaded', init)



//######################################### Handler functions
function headinghandler() {
    this.classList.toggle('active')
    const id = this.dataset.id
    const tile = document.querySelector(`#tile${id}`)
    tile.classList.toggle('active')
    const symbol = this.querySelector('#symbol')
    symbol.textContent = symbol.textContent == "+" ? "-" : "+"
}


//#################################### init
function init() {
    listWrapper = document.querySelector('.list--wrapper')

    let styleToBeAdded=document.createElement('style')
    let styleString=''
    let styleStringMedia=''

    const data = jsonData;
    for (x in data) {
        let id = data[x]["id"]
        let title = data[x]["title"]
        let tilesHtml=''
        let height= parseInt(55 * parseInt(data[x]["count"]))
        let heightMedia= parseInt(35 * parseInt(data[x]["count"]))

        for(let i=1;i<=data[x]["count"];i++){
            let name = data[x]["tiles"][`tile${i}`]["name"]
            let description = data[x]["tiles"][`tile${i}`]["description"]
            let imgSrc = data[x]["tiles"][`tile${i}`]["imgSrc"]
            let link = data[x]["tiles"][`tile${i}`]["link"]
            tilesHtml+= makeTile(name,description,imgSrc,link);
        }

        listWrapper.innerHTML += makeTileSection(id, title,tilesHtml);
        styleString+=(addStyle(id, height))
        styleStringMedia+=(addStyle(id, heightMedia))
    }

    styleToBeAdded.textContent=styleString    
    styleToBeAdded.textContent += `@media only screen and (max-width: 600px) {${styleStringMedia}}`
    document.head.append(styleToBeAdded)

    //###################### initiate event listeners
    sectionHeaders = document.querySelectorAll('#section__header')
    sectionHeaders.forEach(x => x.addEventListener('click', headinghandler))
}

function makeTileSection(id, title, tilesHtml) {
    let html = `
    <div class="section" >                
        <div id="section__header" data-id="${id}" >${title} 
        <span id="symbol">+</span>
        </div>                
            <div class="tile--wrapper flex-col " id="tile${id}">     
            
            ${tilesHtml}
            
            </div>
    </div>
    `
    return html
}

function makeTile(name, description, imgSrc, link) {
    let html = `
    <div class="tile flex-row"  >
        <div id="tile_text" class="flex-col">
            <a target='_blank' href=${link}>
            <span id="tText_head">${name}</span>
            </a>
            <span id="tText_desc">${description}</span>
        </div>
        <div id="tile_image" > 
        <a target='_blank' href=${link}>
            <img src=${imgSrc} alt="">
        </a>
        </div>
    </div>                    
    `

    return html
}

function addStyle(id,height){
    const style = document.createElement('style');
    let styleString =`
    #tile${id}.active{
        height: ${height}vh; 
        margin: 1rem auto;
    
    }
    `
    style.textContent = styleString;
    return styleString
}