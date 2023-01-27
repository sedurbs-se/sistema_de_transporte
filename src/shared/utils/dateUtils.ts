import dayjs from "dayjs"


export const getFormatedDateFromString = (date: string) => { let parsedDate = date.split('/'); return dayjs(`${parsedDate[2]}-${parsedDate[1]}-${parsedDate[0]}`).locale('pt-br').toDate(); }
export const getFormatedDateTimeString = (date: Date) => dayjs(date).locale('pt-br').format('DD/MM/YYYY-HH:mm');
export const getFormatedDateString = (date: Date) => dayjs(date).locale('pt-br').format('DD/MM/YYYY')


export const getData = (data: Date) => {
    const date = new Date(data);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export const getTime = (data: Date) => {
    const date = new Date(data);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`;
};


export const getLocalDate = (date: string) => {
    let offset = new Date().getTimezoneOffset() * 60000;
    let d = new Date(date);
    return new Date(d.getTime() - offset);
}