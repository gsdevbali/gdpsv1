interface PaginationInfoProps {
  totalRows: number;
  pageIndex: number;
  pageSize: number;
}

export function PaginationInfo({ totalRows, pageIndex, pageSize }: PaginationInfoProps) {
  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalRows);
  const currentPage = pageIndex + 1;
  const totalPages = Math.ceil(totalRows / pageSize);

  return (
    <div className="flex-1 text-sm text-foreground">
      {/* <span className="text-sm font-bold text-orange-500">{totalRows}</span> baris data ditemukan. */}
      <span className="text-sm text-blue-600">
        Baris: {totalRows > 0 ? `${start}-${end} dari ${totalRows}` : totalRows} data
      </span>
      {totalRows > 0 && (
        <span className="text-sm text-blue-600">
          <p> </p>Halaman: {currentPage} dari {totalPages}
        </span>
      )}
    </div>
  );
}