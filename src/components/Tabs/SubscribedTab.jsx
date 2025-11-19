"use client";

export default function SubscribedTab({ subs = [], loading, error, onUploadClick }) {
  if (loading) return <p>Loading subscribed users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full">
      {subs.length > 0 ? (
        <p>Show subscribed users list here...</p>
      ) : (
        <div className="text-center mt-10">
          <p>No subscribers yet.</p>
          <p>This page has no subscribed users.</p>
        </div>
      )}

      <button
        onClick={onUploadClick}
        className="mt-6 text-xl bg-amber-300 px-4 py-2 rounded"
      >
        + New Subscribe
      </button>
    </div>
  );
}
