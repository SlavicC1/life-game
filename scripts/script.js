var img = document.getElementById("game");
var context = img.getContext("2d");

var cells = [];
var count = 10;
var size = img.width/count;
img.height = img.width;

for (i = 0; i < count; i ++)
{
    cells[i] = [];
    for (j = 0; j < count; j ++) 
    {
        cells[i][j] = 0;
    }
}

function Update()
{
    Draw(size, count);
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
            context.fillStyle = '#AF5200';
        }
        context.fillRect(i * size + 1, j * size + 1, size - 2, size - 2);
    }
}

var time = new Date().getTime();
var stepTime = 0.5;