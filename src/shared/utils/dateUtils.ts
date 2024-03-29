import dayjs from "dayjs"


export const getFormatedDateFromString = (date: string) => { let parsedDate = date.split('/'); return dayjs(`${parsedDate[2]}-${parsedDate[1]}-${parsedDate[0]}`).locale('pt-br').toDate(); }
export const getFormatedDateTimeString = (date: Date) => dayjs(date).locale('pt-br').format('DD/MM/YYYY-HH:mm');
export const getFormatedDateString = (date: Date) => dayjs(date).locale('pt-br').format('DD/MM/YYYY')


export const getData = (data: Date) => {
    const date = new Date(data);
    // console.log(date)
    let formated = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    // console.log(formated)
    return formated;
}

export const getTime = (data: Date) => {
    const date = new Date(data);

    console.log(date)

    const hours = date.getHours();
    const minutes = date.getMinutes();



    const formated = `${hours}:${minutes}`

    console.log(formated)

    return formated ;
};


export const getLocalDate = (date: string) => {
    let offset = new Date().getTimezoneOffset() * 60000;
    let d = new Date(date);
    return new Date(d.getTime() - offset);
}