<!-- REPO BADGES -->
<p align="center">
  <a href="http://forthebadge.com/badges/ages-12.svg">
    <img
      height="32"
      src="http://forthebadge.com/badges/ages-12.svg"
      alt="Age badge" >
  </a>

  <a href="http://forthebadge.com/badges/ages-12.svg">
    <img
      height="32"
      src="http://forthebadge.com/badges/uses-js.svg"
      alt="JS badge">
  </a>
  
  <a href="http://forthebadge.com/badges/ages-12.svg">
    <img
      height="32"
      src="http://forthebadge.com/badges/built-with-swag.svg"
      alt="Swag badge">
  </a>
</p><!-- ./REPO BADGES -->

<p>&nbsp;</p><!-- Spacing -->



# Clearscore Widget ✨
The widget is live running at [https://clearscore.surge.sh](https://clearscore.surge.sh). Enjoy!

<img width="200" src="https://media.giphy.com/media/aqFRBqGjnznd6/giphy.gif" alt="Waiting">


## Table of Contents
* [Overview](#overview)
* [Screenshots](#screenshots)
* [Requirements](#requirements)
* [Browser Support](#browser-support)
* [Installation](#installation)
* [Tests](#tests)
* [Contributors](#contributors)
* [License](#license)

<p>&nbsp;</p><!-- Spacing -->


## Overview
This project is written using modern javascript (ES6+/ES2015+) and [React](https://reactjs.org/). No external state solution (Redux/Mobx) is used for simplicity. Apart from [React](https://reactjs.org/) & [youreadydom](https://github.com/Tahseenm/youreadydom), there are no other dependencies. [youreadydom](https://github.com/Tahseenm/youreadydom) is a tiny, promise-based library I wrote to run javascript code when the DOM is ready 😀
Global and components styles are written in Sass but could easily be written in vanilla CSS. __BEM__ methodology is used for component styling & modularality.

This project was bootstrap using __create-client-app__ CLI app. This is a tool I wrote using Node.js to help me bootstrap frontend projects. It is inspired Facebook's [create-react-app](https://github.com/facebook/create-react-app).

The current solution for the widget only works in modern browsers that support CSS filter. The hack used to achieve the blurred effect makes the score widget less reusable. `backdrop-filter` can be used to create the effect with a single line of code but is only supported in Safari. To achieve the same effect with Internet explorer support, a second blurred image can be used. This results in making an extra request 😢

<p>&nbsp;</p><!-- Spacing -->


## Screenshots
| Mobile                 | Laptop |
| ------                 | ------ |
| <p align="center"><img width="200" src="https://s9.postimg.org/bb231jibj/solution--mobile.png" alt="mobile view"></p> | <p align="center"><img width="640" src="https://s9.postimg.org/3v2tfyke7/solution--laptop.png" alt="laptop view"></p>    |

<p>&nbsp;</p><!-- Spacing -->


## Requirements
[NodeJS](https://nodejs.org/en/)


## Browser Support
| Chrome | Safari | IE / Edge   | Firefox | Opera |
| ------ | ------ | ----------- | ------- | ----- |
| Yes    | Yes    | _Edge only_ | Yes     | Yes   |

<p>&nbsp;</p><!-- Spacing -->


## Installation
Using [npm](https://www.npmjs.com/)
```bash
> npm install
```

Using [yarn](https://yarnpkg.com/en/)
```bash
> yarn
```

<p>&nbsp;</p><!-- Spacing -->


## Tests
### Unit tests
Run Unit tests using [jest](https://facebook.github.io/jest/)

Using [npm](https://www.npmjs.com/)
```bash
> npm test
```

Using [yarn](https://yarnpkg.com/en/)
```bash
> yarn test
```


### Code coverage
<p>
  <img width="600" src="https://s9.postimg.org/incl49jqn/Screen_Shot_2018-02-06_at_18.38.27.png" alt="test coverage">
</p>
The project has __100% code coverage__ which can be checked using the following command.

Using [npm](https://www.npmjs.com/)
```bash
> npm run test:coverage
```

Using [yarn](https://yarnpkg.com/en/)
```bash
> yarn test:coverage
```

<p>&nbsp;</p><!-- Spacing -->



## Contributors
[Tahseen Malik](https://tahseenmalik.com)


## License
MIT