## Sticky header with pure JS

#### [Try demo in browser](https://moonbrv.github.io/sticky-header-test/)

This is my realisation of sticky header with pure JS. It is responsive and works well on mobile browsers, include android 4.4+ and iOS8+.

Heart of this project is a module, wich export a function. This function will create, remove and change sticky header. It can be placed inside any element on page, and will tracking headers that you select.

File of this module "goSticky.js", also there you will find explanation of his features.

In this project I used:
- WebPack (DevServer + HMR)
- Sass

Project have two build config.

To build project:

1. Clone/download repository.
2. Enter to folder with repository.
3. Run command:
  
  ```
  npm run dev
  ```
  This comand launch webpack and webpack-dev-server with HMR.
  
  To production build run command:
  ```
  npm run prod
  ```

I will be happy to hear any comment about my code.