interface PaginationInfoProps {
    totalRows: number;
  }
  
  export function PaginationInfo({ totalRows }: PaginationInfoProps) {
    return (
      <div className="flex-1 text-sm text-foreground">
        <span className="text-sm font-bold text-orange-500">{totalRows}</span> baris data ditemukan.
      </div>
    );
  }