# My Steps to get this project working
With so many packages and frameworks, it can be difficult to get a project working. Here are the steps I took to get this project working.
## Setting up the environment
- node.js and npm are required to run this project. I installed them by following the instructions on the [node.js website](https://nodejs.org/en/download/).
- Since the end-goal is to deploy this project on Cloudflare, Git must be installed. I installed Git by following the instructions on the [Git website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
- It is also recommended to install some extension into VSCode, like the Tailwind CSS IntelliSense extension, or a Remix Snippets extension (I can't vouch for a specific one, but I'm sure there are some good ones out there).
- Everything else will be installed as needed.

## Setting up the project
- The first step is to create a new project. It is possible to find a template or stack that has everything you need, but I decided to start from scratch. I opened a terminal in the location where I wanted the project folder to be, and then I ran 
  **npm create-remix@latest your-project-name**. This created a new folder with the name of the project, and it installed all the dependencies.
  -- The create-remix generator asks a few questions such as if you want to start with an official template, or if you want to start from scratch. I chose to start from scratch (or 'Just the basics'). It then asks where the project will be deployed, and there are a several options. I chose Cloudflare Pages. It then asks if you want to use TypeScript, and I chose yes.
- Next, I opened the project folder in VSCode. I opened the terminal and ran **npm run dev**. This started the development server, and I was able to see the project running at localhost:8788. If it says "Welcome to Remix" then everything is working correctly. The command runs a script that creates a virtual local server, and it also watches for changes to the code. If you make a change to the code, the server will automatically restart and the changes will be reflected in the browser.  
  - In this case, cloudflare uses wrangler to deploy the project, and since Cloudflare is a bit different than a typical dev environment, a few more things need to be set up. In the terminal you should see an error that says, Error: No route matches URL "/cdn-cgi/mf/reload" (404). Fixing this will be the next step.

### Setting up all the Cloudflare stuff