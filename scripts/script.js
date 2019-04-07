var img = document.getElementById("game");
var context = img.getContext("2d");

var cells = [];
var count = 10;
var size = img.width/count;
img.height = img.width;

var counter = 0;
var gameState = 0;

function SetFreeGreed()
{
    for (i = 0; i < count; i ++)
    {
        cells[i] = [];
        for (j = 0; j < count; j ++) 
        {
            cells[i][j] = 0;
        }
    }
}
SetFreeGreed();

function GameStep()
{
    var oldCells = [];
    for (i = 0; i < count; i ++)
    {
        oldCells[i] = [];
        for (j = 0; j < count; j ++) 
        {
            oldCells[i][j] = cells[i][j];
        }
    }

    for (i = 0; i < count; i ++)
    for (j = 0; j < count; j ++) 
    {
        counter = 0;
        if(i > 0)
        {
            if(cells[i-1][j] == 1)
            {
                counter++;
            }
            if(j>0)
            {
                if(cells[i-1][j-1] == 1)
                {
                    counter++;
                }
            }
            if(j < count - 1)
            {
                if(cells[i-1][j+1] == 1)
                {
                    counter++;
                }
            }
        }
        if(i < count - 1)
        {
            if(cells[i+1][j] == 1)
            {
                counter++;
            }
            if(j>0)
            {
                if(cells[i+1][j-1] == 1)
                {
                    counter++;
                }
            }
            if(j < count - 1)
            {
                if(cells[i+1][j+1] == 1)
                {
                    counter++;
                }
            }
        }
        if(j > 0)
        {
            if(cells[i][j-1] == 1)
            {
                counter++;
            }
        }
        if(j < count - 1)
        {
            if(cells[i][j+1] == 1)
            {
                counter++;
            }
        }
        
        if(counter >= 4 || counter <= 1)
        {
            oldCells[i][j] = 0;
        }
        
        if(counter == 3)
        {
            oldCells[i][j] = 1;
        }
        
    }

    for (i = 0; i < count; i ++)
    {
        for (j = 0; j < count; j ++) 
        {
            cells[i][j] = oldCells[i][j];
        }
    }

}

function Stop()
{
    gameState = 0;
    SetFreeGreed();
    Draw(size, count);
}

function PlayPause()
{
    gameState++;
    gameState%=2;
}

function SetCell()
{
    if(gameState == 0)
    {
        var zone = document.getElementById("game");
        var size1 = zone.offsetWidth/count;
        var x = parseInt((event.pageX - zone.offsetLeft)/size1);
        var y = parseInt((event.pageY - zone.offsetTop)/size1);
        cells[x][y]++;
        cells[x][y]%=2;
        Draw(size, count);
    }
}

function Draw(size, count)
{
    for (i = 0; i < count; i ++)
    for (j = 0; j < count; j ++) 
    {
        if(cells[i][j] === 0)
        {
            context.fillStyle = '#000';
        }
        else
        {
            context.fillStyle = '#f88';
        }
        context.fillRect(i * size + 1, j * size + 1, size - 2, size - 2);
    }
}

var timer =  setInterval(function Update()
{
    if(gameState != 0)
    {
        GameStep();
    }
    Draw(size, count);
}, 300);