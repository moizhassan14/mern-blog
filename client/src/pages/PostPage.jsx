import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPost] = useState(null);
  useEffect(() => {
    try {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          setError(true);
          return;
        } else {
          setPost(data.posts[0]);
          setLoading(false);
          setError(null);
        }
      };
      fetchPosts();
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [postSlug]);
  useEffect(() => {
    try {
      const fetcPosts = async () => {
        const res = await fetch(`/api/post/getPosts?limit=3`);
        if (res.ok) {
          const data = await res.json();
          setRecentPost(data.posts);
        }
      };
      fetcPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="flex flex-col min-h-screen mx-auto max-w-6xl p-3">
      <h1 className="text-3xl text-center mt-10 p-3 font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.image}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-h-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 mx-auto max-w-2xl w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      {post && <CommentSection postId={post._id} />}
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent article</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
