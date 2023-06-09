<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/atharva-codes/VIDVATTA">
    <img src="img/Hello1.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">VIDVATTA</h3>

  <p align="center">
    VIDVATTA is an simple to set-up blog application for developers who want to start their own blog.
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://vidvatta.cyclic.app/">View Demo</a>
    ·
    <a href="https://github.com/atharva-codes/VIDVATTA/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

VIDVATTA is an simple-to-setup blog application of developers who are interested to start theis own blog.
The demo can be seen in the VIDVATTA website. The data gets stored in ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) you can edit your database link in `app.js` file, and the rich-text editor on this site comes with the help of <bold>Tinymce</bold>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
* ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these simple steps to get started
* Fork this repository
* Clone your forked repository 
* Run `npm i` to install modules
* Run `nodemon` or `node app.js`

### Installation
- Clone repository with the command `git clone <url>`
```
$ git clone https://github.com/atharva-codes/VIDVATTA.git
```

- Run `npm i` in your terminal to install `node_modules` and all dependencies in `package.json`
```
$ npm i
```
- After installation replace the TinyMce cloud url in `views/partials/header.ejs` add your own url to access rich-text-editor

- Run `nodemon` in your terminal if installed to start the node server and watch for changes in `app.js`
```
$ nodemon
```

- Or run `node app.js` to start the server if `nodemon` is not installed
```
$ node app.js
```
- The following message should be logged to your console signifying success.

```
Server started on port 3000
```

- To Create Admin Login, Open Folder `createAdmin.js` and Replace the Username, Password and DB Url with yours, Instruction Given in The FOLDER. And Run
```
$ node createAdmin.js
```
- After Running Following message be logged to your console
```
Admin created successfully
```

- To use MongoDB with Mongoose locally, do this in `app.js`:
```
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Rich Text Editor
- [ ] Search Blog Title
- [ ] Blog Categories page
- [ ] Post Title
- [ ] Post SubHeading
- [ ] Post Background Image
- [ ] Post SEO
- [ ] Post Body

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
contact me on [Email](mailto:contactme.atharvasen@gmail.com)
Project Link: [https://github.com/atharva-codes/VIDVATTA](https://github.com/atharva-codes/VIDVATTA)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [](Atharva)
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributors
<a href="https://github.com/atharva-codes/VIDVATTA/graphs/contributors">
  <img src="https://opencollectivecom/html-react-parser/contributors.svg?width=890&button=false">
</a>

Made with [contrib.rocks](https://contrib.rocks).

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/atharva-codes/VIDVATTA.svg?style=for-the-badge
[contributors-url]: https://github.com/atharva-codes/VIDVATTA/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/atharva-codes/VIDVATTA.svg?style=for-the-badge
[forks-url]: https://github.com/atharva-codes/VIDVATTA/network/members
[stars-shield]: https://img.shields.io/github/stars/atharva-codes/VIDVATTA.svg?style=for-the-badge
[stars-url]: https://github.com/atharva-codes/VIDVATTA/stargazers
[issues-shield]: https://img.shields.io/github/issues/atharva-codes/VIDVATTA.svg?style=for-the-badge
[issues-url]: https://github.com/atharva-codes/VIDVATTA/issues
[license-shield]: https://img.shields.io/github/license/atharva-codes/VIDVATTA.svg?style=for-the-badge
[license-url]: https://github.com/atharva-codes/VIDVATTA/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/NodeJs-20232A?style=for-the-badge&logo=nodeJs&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
