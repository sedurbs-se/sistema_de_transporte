import style from './index.module.scss'
import errors from '@utils/errors.json'

interface InputErrorProps {
    type:string | any,
    form: string,
    field:string,
}

export function InputError({type, field, form}:InputErrorProps){
    // @ts-expect-error
    return <span className={style['field-error']}>{errors[form][field][type]}</span>
}