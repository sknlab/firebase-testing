import { format } from 'date-fns';

export function getDateToday() {
  return format(new Date(), 'yyyy-MM-dd');
}

export function getDateShortFormat(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getDateLongFormat(date: Date): string {
  return format(date, 'E, do MMMM yyyy');
}
