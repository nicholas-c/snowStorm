# Snow Storm v0.8.1
Snow Storm is a vanilla JS Library which adds snow to any page. Options are documented below, however allow configuration to choose which element to attach to, and which pages to inialise on.

Open to all, and any PR to improve functionality or code.

*Now with more babel*

## TODO:
- [x] Create base structure with ES6
- [x] Method to create "Canvas" Element
- [x] Snowflakes as seperate class to enable extension
- [x] Draw on canvas and snow elements
- [ ] Limit FPS
- [ ] Clear memory stack when it all gets a bit too much
- [ ] Multiple snowstorm elements
- [ ] Destory method (Remove everything and flush memory and commit suicide)
- [ ] Page specific triggers and initialisation
- [ ] Move elements into the config array and have default element (Body)
- [ ] Config to be passed in and merged with default values (Color, speed, direction)
- [ ] Enable extra features such as mouse control (Features undecided)
- [x] Enable backwards compatibility and use task runners to make Babel nice-ness

## Installation
Plan on making this an NPM and Yarn package, watch this space.

For now, file goes in a folder and compiled and class called with `new` constructor

## Initalisation
For now (See todo) only a _*single*_ element can be passed in, such as the body tag

WARNING: Body tag doesn't get it's height properly, so avoid body and use a page wrap or the likes.

```
var element = document.querySelector('.selector');

var snowstorm = new SnowStorm(element, {});
```

## Options
No real options yet, expect for element as outlined above... Watch this space!
