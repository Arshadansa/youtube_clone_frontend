"use client";

export default function TableLayout({ columns = [], children, err }) {
  const hasRows = Array.isArray(children) && children.length > 0;
console.log(err);

  return (
    <div className="w-full overflow-x-auto">
      {err ? (
        <div className="text-center mt-10 text-red-500">{err}</div>
      ) : hasRows ? (
        <table className="min-w-full text-white backdrop-blur-md">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`py-2.5 px-4 border-b text-${col.align || "left"}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      ) : null}
    </div>
  );
}
