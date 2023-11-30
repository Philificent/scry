# Scry

Version : 23.11.15pa (pre-alpha)
Current Status: NOT WORKING

Tool for devs running on BigCommerce to debug their content/global regions for widgets

This is a simple script that you can drop into your site "scripts" section of your BC Admin console that will help you and other content managers
debug your widget/content regions.

- You can change the invoke code by swapping out the keypress event listener pattern
- Feel free to make it your own, I built it in the way I wanted it, doesn't mean you have to keep it that way 😉
- Provided as is, but feel free to change it as you see fit
- No warranties, check the license
- I am not affiliated with BigCommerce, but I run a team that uses their service(s), and I like to make things easier for them to do their jobs

## How to use

To keep this as simple as possible, consult the following sections for development and production use.

### Development

This project is built as an Astro joint, so after cloning the repo, run `npm install` and `npm run dev` in your terminal.

After the project is up, point your browser to [localhost:4321](http://localhost:4321) and you should be ready to start working

### Production

You don't use any of the Astro bits in production, you just need the `public/js/scry.js`` file.

After the script `scry.js` (or contents) has been applied to your BigCommerce page/site, type the magic word ('scry' by default) on the page and watch the magic happen. I would strongly recommend using a word that isn't commonly found on your site to avoid it being triggered by accident.

You can also remove the key event listener entirely and invoke the function via the browser console.

## Todos

- Toggle display preferences (3D, opacity, custom ui/layout)
- Add a close button instead of having to reload the page
- Add a feature to keep it on unless toggled off (auto load/init)
- Actual Demo page/site instead of just the development page... maybe?
- All the other things I forgot
