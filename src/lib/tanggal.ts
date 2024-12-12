import { format } from 'date-fns';

export function tanggal(tgl: Date) {
  const tglNew = format(tgl,'dd-MM-yyyy')
  return tglNew;
}


export function getMonth(num: number) {
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const monthName = monthNames[num];
  return monthName;
}


export function toLocalDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}


export function toQueryDate(date: string) {
  const dateObj = new Date(date);
  return `${dateObj.getMonth() + 1 < 10 ? '0' : ''}${dateObj.getMonth() + 1}-${dateObj.getDate() < 10 ? '0' : ''}${dateObj.getDate()}-${dateObj.getFullYear()}`;
  //return `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`;
  //return `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`;
}