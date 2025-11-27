import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function PlaylistUploadForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const submitForm = async (data) => {
    try {
    await onSubmit(data);
     toast.success("Playlist created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col space-y-4 w-full max-w-md"
    >
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">
          Playlist Namek
        </label>
        <input
          type="text"
          {...register("name", { required: "Playlist name is required" })}
          className={`p-2 border rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          {...register("description", {
            required: "Description is required",
            maxLength: { value: 200, message: "Max 200 characters allowed" },
          })}
          rows={4}
          className={`p-2 border rounded ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <span className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        {isSubmitting ? "Creating..." : "Create Playlist"}
      </button>
    </form>
  );
}
