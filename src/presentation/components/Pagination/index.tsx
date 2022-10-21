import { Pagination } from "react-bootstrap";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent = ({ page, totalPages, onPageChange }: PaginationProps) => {


    const generatePaginationItems = () => {

    }
    return (
        <Pagination>
        </Pagination>
    )
}