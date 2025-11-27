import React from "react";
import { useForm } from "react-hook-form";
import { useVideos } from "../../context/VideoContext";

const VideoUploadForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const { setUserVideo } = useVideos();

  const submitHandler = async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("thumbnail", data.thumbnail[0]);
  formData.append("videoFile", data.videoFile[0]);

  try {
    const res = await onSubmit(formData);

    // MUST use res.data.data because backend returns { data: {...video} }
    const newVideo = res.data.data;

    // update UI instantly (no refresh needed)
    setUserVideo((prev) => [newVideo, ...prev]);

    reset();
    alert("Video uploaded successfully!");
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    alert("Error uploading video");
  }
};


  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className=" mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      {/* <h2 className="text-2xl font-semibold text-center">Upload Video</h2> */}

      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter video title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register("description", {
            required: "Description is required",
          })}
          className="w-full  border-gray-300 rounded px-3 py-2"
          placeholder="Enter video description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          {...register("thumbnail", { required: "Thumbnail is required" })}
          className="w-full"
        />
        {errors.thumbnail && (
          <p className="text-red-500 text-sm mt-1">
            {errors.thumbnail.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-black font-medium">Video File</label>
        <input
          type="file"
          accept="video/*"
          {...register("videoFile", { required: "Video file is required" })}
          className="w-full placeholder:file"
        />
        {errors.videoFile && (
          <p className="text-red-500 text-sm mt-1">
            {errors.videoFile.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
};

export default VideoUploadForm;
