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
- Check if you have wrangler installed by running **wrangler --version**. If you don't have it installed, run **npm install -g wrangler**. This will install wrangler globally. Check out the [wrangler docs](https://developers.cloudflare.com/workers/cli-wrangler/install-update) for more info.

- Next, you need to log in to your Cloudflare account. Run **wrangler login** and follow the instructions. This will open a webpage to attempt to log in, and give permission to connect the app to your account. 

- Next, you need to create a new D1 database on Cloudflare.  Run **wrangler d1 create your-database-name**. This will create the new database, and will provide some settings that you will need to bind the database.

> [!WARNING]
>  All the docs refer to a file called wrangler.toml, that should be in the root folder. This file is not created by default, and I had to create it manually. I'm not sure if this is a bug or the docs are out of date. However, I just created one manually to save the [[d1_databases]] settings. When I figure out where the values need to go, I will update this.


- Anyway, now logged into the Cloudflare and having run **wrangler** commands, the boilerplate code should run without errors. Run **npm run dev** again to see. If there are still errors, try running **npx remix dev** then stop the server and run **npm run dev** again. This worked for me.

### Adding Tailwind CSS, and other packages
- First off, the most detailed guide I found for building a remix app is on the [Prisma Blog](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-1-7D0BfTXBmB6r). It works for non-Cloudflare projects, but there are a few things that are perhaps unnecessary or out of date.  Prisma does not work well with Cloudflare, and there is some poorly documented guides on using the Data Proxy service from Prisma to get it to work. I would have used CockroachDB as the cloud database in the project, since the free tier is the most generous that I have seen at this time. However, adding proxies and a database from another location seemed to be too complicated and probably defeats the purpose of using Cloudflare. So I decided to use the D1 database from Cloudflare. 
- The Prisma blog post also uses MongoDB, so some of the instructions are not relevant. But for the most part, I followed the instructions and altered them to fit my stack.
- So, according to the [Tailwind CSS docs](https://tailwindcss.com/docs/guides/remix) Remix has built-in support for Tailwind CSS. So I followed the instructions there and installed Tailwind.
  - Enable built-in Tailwind CSS support by adding the following to your remix.config.js file:
  ```
    module.exports = {
        tailwind: true,
    }
  ```    
  - Then run **npm install -D tailwindcss** to install Tailwind CSS as a development dependency.
  - The initialize Tailwind by running **npx tailwindcss init --ts**. This will create a tailwind.config.ts file in the root directory.
  - insert **'./app/\**/*.{js,jsx,ts,tsx}'** into the content array in the tailwind.config.ts file. This will allow Tailwind to know the paths to all of the template files.
  - Next, add the Tailwind directives to the CSS by creating a new file in the app folder called **tailwind.css**. Then add the following to the file:
  ```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  ```
  - Import the newly-created CSS file into the **./app/root.tsx** file by adding the following line to the top of the file:
  ```
    import stylesheet from "~/tailwind.css";
  ```
  and then replacing the links LinksFunction with the following:
  ```
    export const links: LinksFunction = () => [
    { rel: "stylesheet", href: stylesheet },
    ];
  ```
  - TailwindCSS is now installed, so run **npm run dev** to start the development server. Nothing should have changed, yet. 
  - In the **./app/routes/_index.tsx** file, replace the Index function with the following, the save:
  ```
    export default function Index() {

  ```
        return (
            <div className="h-screen bg-slate-700 flex justify-center items-center">
            <h2 className="text-blue-600 font-extrabold text-5xl">TailwindCSS Is Working!</h2>
            </div>
        )
        }
  ```

  