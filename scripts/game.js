function MainConstruct(){

    var img;
    var context;
    var cells = [];
    var count = 10;
    var size;

    var counter = 0;
    var gameState = 0;

    this.Initialization =  function(){
        //will be reworked after some DOM's lessons  
        img = document.getElementById("game");
        context = img.getContext("2d");
        img.height = img.width;
        size = img.width/count;
    };

    this.Update = function(){
        if(gameState != 0){
            GameStep();
        }
        Draw(size, count);
    };

    function SetFreeGreed(){
        for (i = 0; i < count; i ++){
            cells[i] = [];
            for (j = 0; j < count; j ++) {
                cells[i][j] = 0;
            }
        }
    };

    function GameStep(){
        var oldCells = [];
        for (i = 0; i < count; i ++){
            oldCells[i] = [];
            for (j = 0; j < count; j ++) {
                oldCells[i][j] = cells[i][j];
            }
        }

        for (i = 0; i < count; i ++)
        for (j = 0; j < count; j ++) {
            counter = 0;
            if(i > 0){
                if(cells[i-1][j] == 1){
                    counter++;
                }
                if(j>0){
                    if(cells[i-1][j-1] == 1){
                        counter++;
                    }
                }
                if(j < count - 1){
                    if(cells[i-1][j+1] == 1){
                        counter++;
                    }
                }
            }
            if(i < count - 1){
                if(cells[i+1][j] == 1){
                    counter++;
                }
                if(j>0){
                    if(cells[i+1][j-1] == 1){
                        counter++;
                    }
                }
                if(j < count - 1){
                    if(cells[i+1][j+1] == 1){
                        counter++;
                    }
                }
            }
            if(j > 0){
                if(cells[i][j-1] == 1){
                    counter++;
                }
            }
            if(j < count - 1){
                if(cells[i][j+1] == 1){
                    counter++;
                }
            }
            
            if(counter >= 4 || counter <= 1){
                oldCells[i][j] = 0;
            }
            
            if(counter == 3){
                oldCells[i][j] = 1;
            }
            
        }

        for (i = 0; i < count; i ++){
            for (j = 0; j < count; j ++) {
                cells[i][j] = oldCells[i][j];
            }
        }

    };

    this.Stop = function(){
        gameState = 0;
        SetFreeGreed();
        Draw(size, count);
    }

    this.PlayPause = function(){
        var play = document.getElementById("play");
        if(gameState == 0){
            gameState = 1;
            play.classList.add("b-control-zone__button_pause");
            play.classList.remove("b-control-zone__button_play");
        }   
        else{
            gameState = 0;
            play.classList.add("b-control-zone__button_play");
            play.classList.remove("b-control-zone__button_pause");
        } 
    };

    this.SetCell  = function(){
        if(gameState == 0){
            var zone = document.getElementById("game");
            var size1 = zone.offsetWidth/count;
            var x = parseInt((event.pageX - zone.offsetLeft)/size1);
            var y = parseInt((event.pageY - zone.offsetTop)/size1);
            cells[x][y]++;
            cells[x][y]%=2;
            Draw(size, count);
        }
    };

    function Draw(size, count){
        for (i = 0; i < count; i ++)
        for (j = 0; j < count; j ++) {
            if(cells[i][j] === 0){
                context.fillStyle = '#000';
            }
            else{
                context.fillStyle = '#f88';
            }
            context.fillRect(i * size + 1, j * size + 1, size - 2, size - 2);
        }
    };

    return this;
};

var Game = MainConstruct.call(Game);
Game.Initialization();
var timer =  setInterval(function(){Game.Update();}, 100);