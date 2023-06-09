import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const CreatePostWizard = () => {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="flex gap-3 w-full">
      <img src={user.profileImageUrl} alt="Profile image" className="h-14 w-14 rounded-full" />
      <input placeholder="Type something" className="bg-transparent grow outline-none" />
    </div>
  )
}

const Home: NextPage = () => {
  const user = useUser();

  const { data, isLoading } = api.post.getAll.useQuery();

  console.log('user -->', user)

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Something went wrong</div>;

  console.log('user', user.isSignedIn)

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 md:max-w-2xl">
          <div className="border-b border-slate-400 p-4">
            {!user.isSignedIn && (
              <div className="flex justify-center">
                <SignInButton />
              </div>
            )}
            {user.isSignedIn && <CreatePostWizard />}
          </div>
          <div className="flex flex-col">
            {[...data, ...data]?.map((post) => (
              <div className="border-b border-slate-400 p-8" key={post.id}>
                {post.content}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
