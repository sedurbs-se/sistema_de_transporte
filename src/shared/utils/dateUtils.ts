import dayjs from "dayjs"


export const getFormatedDateFromString = (date: string) => {let parsedDate = date.split('/'); dayjs(`${parsedDate[2]}-${parsedDate[1]}-${parsedDate[0]}`).locale('pt-br').toDate();}
export const getFormatedDateTimeString = (date: Date) => dayjs(date).locale('pt-br').format('DD/MM/YYYY-HH:mm');
export const getFormatedDateString = (date: Date) => dayjs(date).locale('pt-br').format('DD/MM/YYYY')


