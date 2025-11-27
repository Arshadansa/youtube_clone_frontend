"use client";

export default function TweetsTab({
  tweets = [],
  loading,
  error,
  onUploadClick,
}) {
  if (loading) return <p>Loading tweets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full">
      {tweets.length > 0 ? (
        <p>Show tweets list here...</p>
      ) : (
        <div className="text-center mt-10">
          <p>No tweets uploaded yet.</p>
          <p>This page has yet to upload tweet data.</p>
        </div>
      )}
    </div>
  );
}
