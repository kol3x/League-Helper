<a name="readme-top"></a>

<div align="center">

  <h3 align="center">League Helper</h3>

  <p align="center">
    A simple LoL match statistics web app.
    <br />
    <br />
    <a href="https://moonlit-kleicha-cc0648.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/kol3x/League-Helper/issues">Report Bug</a>
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
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://moonlit-kleicha-cc0648.netlify.app)

My passion project is developed using React and Redis. It utilizes Riot Games' API to retrieve the latest League of Legends matches for users and presents unique statistics not commonly found on popular LoL-stats websites. To reduce dependency on the API, I've implemented Redis to cache data during the initial lookup.

<p align="right"><a href="#readme-top">back to top</a></p>

### Built With

- [![React][React.js]][React-url]
- [![Redis][Redis.io]][Redis-url]
- [![Express][Expressjs.com]][Express-url]

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Node.js, npm

### Installation

1. Get a free API Key at [Riot Games](https://developer.riotgames.com/)
2. Create a Redis instance, you can do it for free on [railway](https://railway.app/)
3. Clone the repo
   ```sh
   git clone https://github.com/kol3x/League-Helper
   ```
4. Install NPM packages for both react and express folders.
   ```sh
   npm i
   ```
5. Fill the react folder .env file with the following.
   ```js
   SERVER_URL = "http://localhost:5005";
   ```
6. Run the react frontend and copy the adress of frontend instance.
   ```sh
   npm run dev
   ```
7. Enter your API, Redis URL, frontend adress and pot in `.env` of express folder.
   ```js
   RIOT = "ENTER YOUR API";
   REDIS_URL = "you Redis instance";
   PORT = 5005;
   FRONTEND_URL = "ENTER FRONTEND URL FROM PREV STEP";
   ```
8. Run the backend instance
   ```sh
   npm run serverstart
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

By default it opens my League profile. To look at a different one, you should type a username, RIOT tag and select a server in the header.
Another option is to click any on the teammates/enemys names to go and see their matches.

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- ROADMAP -->

## Roadmap

- [ ] Redesign match box.
- [ ] Add goals for next match.

I'd be happy for you to join and build up this project with me.

<p align="right"><a href="#readme-top">back to top</a></p>

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

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/nikolai-shcherbinin/
[product-screenshot]: https://zingy-griffin-616d20.netlify.app/assets/project-2-btNll4wK.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redis.io]: https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
[Expressjs.com]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=react&logoColor=61DAFB
[Express-url]: https://expressjs.com/
