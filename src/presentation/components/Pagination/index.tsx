import { Pagination } from "react-bootstrap";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent = ({ page, totalPages, onPageChange }: PaginationProps) => {


    const generatePaginationItems = () => {
        const items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === page} onClick={() => onPageChange(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
    };

    return (
        <Pagination>
            {generatePaginationItems()}
        </Pagination>
    )
}