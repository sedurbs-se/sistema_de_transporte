import { BadgeProps } from "react-bootstrap";

export type BadgeType =  'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'white' | 'muted';


export default function getBadgeTypeByStatus(status: string): BadgeType {
    let result: BadgeType = 'primary';
    switch(status) {
        case('ESPERA'):
        result = 'warning'
        break;
        case('AUTORIZADO'):
        result = 'success';
        break;
        case('CANCELADO'):
        result = 'danger';
        break;
    }
    return result;
}