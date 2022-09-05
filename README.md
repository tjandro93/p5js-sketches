# p5.js Sketchbook

This is my personal sketchbook for making generative art in p5.js.

# Running dev server

`npm run start`

# Creating a new sketch

`npm run generate-interactive-sketch -- --name=<path>/<to>/<place>/<sketch>`
or
`npm run generate-sketch -- --name=<path>/<to>/<place>/<sketch>`

This will just scaffold a sketch file and an NgModule. The last part of the path will be used for the sketch name.

After running this you'll need to wire up routing manually via the appropriate parent module. You'll also need to edit `src\app\core\constants\sketch-route-sidenav-links.constants.ts` to make your sketch appear in the sidenav.

Note that each sketch is left in it's own lazy-loaded module because this really improves compile time letting you iterate your sketches faster.
