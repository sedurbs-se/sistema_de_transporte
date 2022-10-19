import style from './index.module.scss'
import errors from '@utils/errors.json'

interface InputErrorProps {
    type:string | any,
    field:string,
}

export function InputError({type, field}:InputErrorProps){
    // @ts-expect-error
    return <span className={style['field-error']}>{errors[field][type]}</span>
}