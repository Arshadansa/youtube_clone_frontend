import Swal from "sweetalert2";

export async function ConfirmNotify() {
  const result = await Swal.fire({
    title: "Delete Video?",
    text: "Are you sure you want to delete this video?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  });

  return result.isConfirmed;
}
