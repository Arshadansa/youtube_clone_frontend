
function SingleVideoLayout({ left, right }) {
  return (
    <div className="flex  flex-col md:flex-row gap-4 p-3">
      <div className="flex-1 ">{left}</div>
      <div className="w-full  md:w-[30%]">{right}</div>
    </div>
  );
}

export default SingleVideoLayout;
