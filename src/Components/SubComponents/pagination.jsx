export default function PaginationUI({ pagination, setPage }) {
  return (
    <div className="flex gap-1 mb-8 flex-wrap items-center justify-center">
      {Array.from({ length: pagination?.totalPage }).map((v, i) => (
        <p
          onClick={(e) => setPage(e.target.innerHTML)}
          className={`w-10 h-10 flex cursor-pointer  items-center justify-center ${
            i + 1 == pagination?.page ? "bg-green-200" : "bg-green-50"
          } rounded-md`}
        >
          {i + 1}
        </p>
      ))}
    </div>
  );
}
