
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setError("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setError(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row p-3 max-w-3xl gap-5 md:items-center mx-auto ">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl ">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Moiz
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is Moiz Blog.You can sign in with your email and password or
            with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3"> Loading...</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
