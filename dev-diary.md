# My Steps to get this project working
With so many packages and frameworks, it can be difficult to get a project working. Here are the steps I took to get this project working.
## Setting up the environment
- node.js and npm are required to run this project. I installed them by following the instructions on the [node.js website](https://nodejs.org/en/download/).
- Since the end-goal is to deploy this project in the cloud, Git must be installed. I installed Git by following the instructions on the [Git website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
- It is also recommended to install some extension into VSCode, like the Tailwind CSS IntelliSense extension, or a Remix Snippets extension (I can't vouch for a specific one, but I'm sure there are some good ones out there).
- Everything else will be installed as needed.
- I originally wanted to deploy to cloudflare, but I ran into too many troubles. Cloudflare uses its own CLI, the settings are very different. Remix uses SSR, which is tough to implement with OAuth or at least the documentation isn't that good yet. Using an external database with Prisma as the ORM, it required a proxy to work between. Any way, I wanted to use Clerk for auth and user management, since it was plug and play, but Clerk couldn't get the required keys from the env. I had been planning on using CockroachDB, but that required a data proxy to work between it and CF. My opinion is that there are a lot of great tools and platforms out there and CF and Remix basically are developing so fast, the docs haven't caught up.

- So the plan is to create a remix app with Clerk auth/user management, CockroachDB and Prisma. TailwindCSS, Heroicons, DaisyUI, and a few other tools for the frontend.
- Future plans are to deploy to something like Fly, vercel or koyeb.


## Setting up the project
- The first step is to create a new project. It is possible to find a template or stack that has everything you need, but I decided to start from scratch. I opened a terminal in the location where I wanted the project folder to be, and then I ran 
  **npm create-remix@latest your-project-name**. This created a new folder with the name of the project, and it installed all the dependencies.
  -- The create-remix generator asks a few questions such as if you want to start with an official template, or if you want to start from scratch. I chose to start from scratch (or 'Just the basics'). It then asks where the project will be deployed, and there are a several options. I chose Remix Server, as I don't have a specific one in mind. It then asks if you want to use TypeScript, and I chose yes.
- Next, I opened the project folder in VSCode. I opened the terminal and ran **npm run dev**. This started the development server, and I was able to see the project running at localhost:3000. If it says "Welcome to Remix" then everything is working correctly. The command runs a script that creates a virtual local server, and it also watches for changes to the code. If you make a change to the code, the server will automatically restart and the changes will be reflected in the browser.  



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
  - insert 
    ```
    './app/**/*.{js,jsx,ts,tsx}'
    ```
    into the content array in the tailwind.config.ts file. This will allow Tailwind to know the paths to all of the template files.
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

TODO: add more steps here

## Installing Icons and Fonts
- Heroicons is one of many icon libraries that can be used with Remix. Heroicons is made by the makers of Tailwind CSS so it is easy to install and use.
  ```
    npm install @heroicons/react
  ``` 
- Some Google Fonts
  ```
    // tailwind.css or the main css file
    @import url("https://fonts.googleapis.com/css?family=Poppins|Fira+Sans|Merriweather&display=swap");
  ```
## Installing Prisma ORM
npm i -D prisma
npx prisma init--datasource-provider cockroachdb
// schema.prisma edits
// .env insert connection string from cockroachdb


## Sign in/Sign Up, etc

- Added a sign-in route, with conditional form fields using state. 

## Authentication Flow

- install bcryptjs and its type definitions (**npm i bcryptjs**, then  **npm i -D @types/bcryptjs**)

