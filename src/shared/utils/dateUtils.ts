import dayjs from "dayjs"


export const getFormatedDateFromString = (date: string) => {let parsedDate = date.split('/'); return dayjs(`${parsedDate[2]}-${parsedDate[1]}-${parsedDate[0]}`).locale('pt-br').toDate();}
export const getFormatedDateTimeString = (date: Date) => dayjs(date).locale('pt-br').format('DD/MM/YYYY-HH:mm');
export const getFormatedDateString = (date: Date) => dayjs(date).locale('pt-br').format('DD/MM/YYYY')

export function isIsoDate(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str); 
    return d instanceof Date && !isNaN(d) && d.toISOString()===str; // valid date 
  }
