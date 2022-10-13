import Link, { LinkProps } from "next/link"

export interface DropdownLinkProps extends LinkProps {
    text: string
}

const DropdownLink = (props: DropdownLinkProps) => {
    return (
        <Link
        {...props}
        >
        <a className="dropdown-item">{props.text}</a>
        </Link>
    )
}

export default DropdownLink;