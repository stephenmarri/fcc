let sectionHeaders;
let listWrapper;
let gridSelector;
let tileWrappers;
let tiles;
let arrows;



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
        let totalCount = data[x]["count"]
        let tilesHtml=''
        let height= parseInt(55 * parseInt(data[x]["count"]))
        let heightMedia= parseInt(35 * parseInt(data[x]["count"]))

        for(let i=1;i<=data[x]["count"];i++){
            let id = data[x]["tiles"][`tile${i}`]["id"]
            let name = data[x]["tiles"][`tile${i}`]["name"]
            let description = data[x]["tiles"][`tile${i}`]["description"]
            let imgSrc = data[x]["tiles"][`tile${i}`]["imgSrc"]
            let link = data[x]["tiles"][`tile${i}`]["link"]
            tilesHtml+= makeTile(id,name,description,imgSrc,link,totalCount);
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
    gridSelector=document.querySelector('#grid')
    gridSelector.addEventListener('change',viewHandler)
    sectionHeaders.forEach(x => x.addEventListener('click', headinghandler))
}

function makeTileSection(id, title, tilesHtml) {
    let html = `
    <div class="section" >                
        <div id="section__header" data-id="${id}" >${title} 
        <span id="symbol">+</span>
        </div>                
            <div class="tile--wrapper flex-col grid_disabled" id="tile${id}">     
            
            ${tilesHtml}
            
            </div>
    </div>
    `
    return html
}

function makeTile(id,name, description, imgSrc, link, totalCount) {
    let html = `
    <div class="tile flex-row grid_disabled" data-tileItem=${id}>

    <div id="tileCounter" class="flex-col">
        <span id="tileCounterText">${id}/${totalCount}</span>
    </div>

        <div id="leftArrow" class="arrMainDiv flex-col">
            <div class="arrInnDiv flex-col" >
                <span class="arrow"><i class="fa fa-angle-left fa-4x"></i></span>
            </div>
        </div>

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

        <div id="rightArrow" class="arrMainDiv flex-col">
            <div class="arrInnDiv flex-col" >
                <span class="arrow"><i class="fa fa-angle-right fa-4x"></i></span>
            </div>
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


function viewHandler(){
    tileWrappers=document.querySelectorAll('.tile--wrapper')
    tiles=document.querySelectorAll('.tile')

    //enalble grid
    if(gridSelector.checked == true){
        tileWrappers.forEach(x=>{
            x.classList.remove('grid_disabled')
            x.classList.add('grid')
        })
        tiles.forEach(x=>{
            x.classList.remove('grid_disabled')
            x.classList.add('grid')
        })
        let tileItem1s= document.querySelectorAll('[data-tileItem]')
        tileItem1s.forEach(x=>{
            if(x.dataset.tileitem==1){
                x.classList.add('active')
            }
        });

        //enabling arrows
        arrows = document.querySelectorAll('.arrInnDiv')
        arrows.forEach(x=>x.addEventListener('click',arrowHandler))
    }

    //disable grid
    if(gridSelector.checked == false){
        tileWrappers.forEach(x=>{
            x.classList.remove('grid')
            x.classList.add('grid_disabled')
        })
        tiles.forEach(x=>{
            x.classList.remove('grid')
            x.classList.add('grid_disabled')
        })
        let tileItem1s= document.querySelectorAll('[data-tileItem]')
        tileItem1s.forEach(x=>{            
                x.classList.remove('active')            
        });
    }
}


function arrowHandler(){
    let currentSection = this.parentNode.parentNode.parentNode.previousElementSibling.dataset.id
    let totalCount = jsonData[`section${currentSection}`]["count"]
    let currTileID = parseInt(this.parentNode.parentNode.dataset.tileitem);
    let currTileWrapper = document.querySelector(`#tile${currentSection}`)
    let tileItem= currTileWrapper.querySelectorAll('[data-tileItem]')
    let nextItem;

    let left_right = this.parentNode.id

    if(left_right == "rightArrow"){
         nextItem = currTileID +1 > totalCount ? 1 : currTileID + 1
    }else if(left_right == "leftArrow"){
         nextItem = currTileID - 1 == 0 ? totalCount : currTileID - 1
    }
    
    
    tileItem.forEach(x=>{
        x.classList.remove('active')
        if(x.dataset.tileitem == nextItem){
            x.classList.add('active')
        }
    })
        
}