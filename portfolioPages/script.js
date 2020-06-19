let projectTiles = document.querySelectorAll('.project-tile')
let showAll = document.querySelector('#showAll')


showAll.addEventListener('click',showAllHandler)
projectTiles.forEach(x => {
    x.addEventListener('click', tileHandler)
})

function tileHandler() {
    switch (this.id) {
        case 'cipher':
            window.open("https://stephenmarri.github.io/js_projects/ciphers/", '_blank');
            break;
        case 'sort':
            window.open("https://stephenmarri.github.io/js_projects/sortingVisualizer/", '_blank');
            break;
        case 'spaceInvaders':
            window.open("https://stephenmarri.github.io/games/spaceInvaders/", '_blank');
            break;
        case 'tetris':
            window.open("https://stephenmarri.github.io/games/tetris/", '_blank');
            break;
        case 'dadJokes':
            window.open("https://stephenmarri.github.io/singletons/randomDadJokes/", '_blank');
            break;
        case 'mathFuntions':
            window.open("https://stephenmarri.github.io/js_projects/mathFunctions/", '_blank');
            break;

        default:
            break;
    }
}


function showAllHandler(){
    window.open("projects.html", '_blank');
}