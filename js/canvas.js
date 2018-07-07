var canvas = new fabric.Canvas('canvas-target', { selection: false });
canvas.setHeight(512);
canvas.setWidth(512);

canvas.backgroundColor = '#efefef';
canvas.isDrawingMode= 1;
canvas.freeDrawingBrush.color = "black";
canvas.freeDrawingBrush.width = 15;
canvas.renderAll();