import React, { useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

import { Layout } from "./components/Layout";
import { Editor } from "./components/Editor";

interface IFormInput {
  title: string;
  content: string;
}

export default function App() {
  const [content, setContent] = useState("");
  const [output, setOutput] = useState("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const newPost = { title: data.title, content: content };
    setOutput(JSON.stringify(newPost, undefined, 2));
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              New post
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Add new post to your blog.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title *
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter post title"
                      {...register("title", { required: true })}
                    />
                  </div>
                  {errors.title && (
                    <p className="mt-2 text-red-500 text-sm">
                      This field is required
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Content
                </label>
                <div className="mt-2">
                  <Controller
                    name="content"
                    control={control}
                    render={({ field: { value } }) => (
                      <Editor
                        onChange={setContent}
                        value={value}
                        placeholder="Write something..."
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 col-span-full">
          <textarea
            readOnly
            rows={5}
            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={output}
            placeholder="Click on the Save button to view results..."
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </Layout>
  );
}
