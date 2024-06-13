import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch(`/api/post/getPosts`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
        }
      };
      fetchPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 px-3 p-28 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          view all posts
        </Link>
      </div>
      <div className="p-3 mb-6">
        <CallToAction />
      </div>
      <div>
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-semibold text-center ">
              Recent Posts
            </h1>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center mb-7"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
