## P1
- Color scale on output chart
- Credits
- Checkbox styling
- image rendering crisp/smooth?
- write paragraphs
- Change height of #main-part for >5 neurons

## P2
- High Noise values makes dots draw outside of -6 +6 domain
- More prominent "Source on GitHub" link?
- make play always play (even when fiddling with settings). Similarly, make pause always pause.
- Some responsive styles so it looks better on chromebook small screens and tablets
- Share buttons (fb, twitter, g+)
- Rendering logic refactor
  - Look at how columns are allocated. I would like them to be more regular, but is tricky.
  - Update data on every tick, but only execute redraw updates on animationFrames.
  - Transitions for enter exit (might require substantial restructuring)

#P3
- tensorflow logo links to tensorflow.org
- Convert to material design lite for ui widgets
- generate data thumbnails dynamically

#Completed
- move "stroke-dashoffset: iterationNumber" update on paths to js. we're already updating some of the path attributes in js on each tick, so should be faster.
- style sliders
- Axis on output chart
- Callout labels for neurons, weights, edges, etc..
- make animation of lines stop when not running
