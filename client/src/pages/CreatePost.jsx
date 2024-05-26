import { FileInput, Select, TextInput, Button } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function CreatePost() {
  return (
    <div className="max-w-3xl mx-auto p-3 min-h-screen">
      <h1 className="text-3xl text-center my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.Js</option>
            <option value="nextjs">Next.Js</option>
          </Select>
        </div>
        <div className="flex justify-between gap-4 items-center border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            outline
            gradientDuoTone="purpleToBlue"
            size="sm"
          >
            Upload a image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="write something..."
          required
          className="h-72 mb-12"
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
}
