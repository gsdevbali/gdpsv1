import { format } from 'date-fns';

export function tanggal(tgl: Date) {
  const tglNew = format(tgl,'dd-MM-yyyy')
  return tglNew;
}

