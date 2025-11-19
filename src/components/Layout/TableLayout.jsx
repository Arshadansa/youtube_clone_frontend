"use client";

export default function TableLayout({ columns = [], children, fallback }) {
  const hasRows = Array.isArray(children) && children.length > 0;

  return (
    <div className="w-full overflow-x-auto">
      {hasRows ? (
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
      ) : (
        <div className="text-center mt-10">{fallback}</div>
      )}
    </div>
  );
}
