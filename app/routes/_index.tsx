import type { V2_MetaFunction } from "@remix-run/cloudflare";
import riceBowl from "public/assets/bowl-rice-regular-48.png";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen bg-blue-100 flex justify-center items-center">
      <h2 className="inline-flex align-middle text-blue-600 font-extrabold text-5xl">
        <img className="object-bottom px-3" src={riceBowl}/> Welcome to Protofolio</h2>
    </div>
  )
}
