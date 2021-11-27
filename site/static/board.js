function initializeBoard() {
    let squares = new Array(8);
    for (let i = 0; i < 8; i++){
        let row = new Array(8);
        for (let j = 0; j < 8; j++){
            let colorsquare = '';
            let typesquare = '';
            if(i === 0 || i === 1){
                colorsquare = 'black';
            } else if(i === 6 || i === 7){
                colorsquare = 'white';
            }
            if(i === 1 || i === 6){
                typesquare = 'pawn';
            } else if(i === 0 || i === 7){
                if(j === 0 || j === 7){
                    typesquare = 'rook';
                } else if(j === 1 || j === 6){
                    typesquare = 'knight';
                } else if(j === 2 || j === 5){
                    typesquare = 'bishop';
                } else if(j === 3){
                    typesquare = 'queen';
                } else{
                    typesquare = 'king';
                }
            }
            row[j] = {color : colorsquare, type: typesquare};
        }
        squares[i] = row;
    }
    return squares;
}
/*
//praneets render
function render() {
    var table = document.createElement("table");
    for (var i = 0; i < 8; i++) {
        var row = table.insertRow(i);
        for (var j = 0; j < 8; j++) {
            var cell = row.insertCell(j);
            var e = document.createElement("h5");
            if(squares[i][j].type != ''){
                e.innerHTML = '<i class="fa-'.concat(squares[i][j].color, ' fa-chess-', squares[i][j].type, '-piece"></i>');
            }
            cell.appendChild(e);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}
*/
// petes render
function render() {
    var root = document.getElementById("board");
    var childNodes = root.children;
    for (var i = 0; i < 64; i++) {
        const row = Math.floor(i / 8);
        const col = i % 8;
        const data = squares[row][col];
        var e = document.createElement("h5");
        if(squares[row][col].type != ''){
            e.innerHTML = '<i class="fa-'.concat(squares[row][col].color, ' fa-chess-', squares[row][col].type, '-piece"></i>');
        }
        childNodes[i].innerHTML = ''
        childNodes[i].appendChild(e)
    }
}