# Engine

## Globals

| Variable     | Description                      |
| ------------ | -------------------------------- |
| roomWidth    | Room size (not canvas size)      |
| roomHeight   | Room size (not canvas size)      |
| canvasWidth  | TODO replace with canvas.width?  |
| canvasHeight | TODO replace with canvas.height? |
| room         | Stores active room               |

## Room

All rooms extend the Room class. Stores list of objects `objects` and creates
objects.

## step() and draw()

In each interval first step() and then draw() from the room is called. In the
superclass Room the list of objects `objects` is traversed and step() or resp.
draw() of each object is called.

Each room and each object should always call super.step() or super.draw() if
they override one of these methods.

The step() method is used for non-visible functional changes and the draw()
method then draws on the canvas.

## Objects

### Coordinates

Each Object has coordinates x and y which define the x and y value on the
in the room.
When the canvas is scaled to a different size, these values do not match the
coordinates on the canvas any more.
Use variables xScalar and yScalar to scale internal distances and xD and yD
for coordinates mapped to the screen.

| Variable | Description                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| x        | x-coordinate in the room                                                                                                              |
| y        | y-coordinate in the room                                                                                                              |
| width    | Object-width in room                                                                                                                  |
| height   | Object-heigh in room                                                                                                                  |
| ox       | Origin-variable (Usually when a sprite is drawn at point (x,y) top-left corner will be at this coordinate, this describes the offset) |
| oy       | Origin-variable                                                                                                                       |
| xScalar  | Multiply a x-room-coordinate with xScalar to get the canvas-coordinate                                                                |
| yScalar  | Multiply a y-room-coordinate with yScalar to get the canvas-coordinate                                                                |
| xD       | Room x-coordinate mapped to the canvas                                                                                                |
| yD       | Room y-coordinate mapped to the canvas                                                                                                |
| widthD   | Object-width on canvas                                                                                                                |
| heightD  | Object-height on canvas                                                                                                               |
| oxD      | Origin-variable ox mapped to the canvas                                                                                               |
| oyD      | Origin-variable oy mapped to the canvas                                                                                               |

The general rule is that you should use x,y,ox,oy in the step() methods while
using xD,yD,oxD,oyD in the draw() methdod. Constants used for drawing should
be multiplied by xScalar or yScalar respectively.
