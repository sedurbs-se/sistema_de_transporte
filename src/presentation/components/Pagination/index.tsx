import { Pagination } from "react-bootstrap";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent = ({ page, totalPages, onPageChange }: PaginationProps) => {

    const generatePaginationItems = () => {
        const items = [];

        const paginationCount = totalPages / 10

        for (let number = 1; number <= paginationCount; number++) {


            // // Elipse na metade da paginação

            // if (number > 3 && number < paginationCount - 3) {
                
            //     if (items[items.length - 1].type.render.displayName != 'Ellipsis') {
            //         items.push(<Pagination.Ellipsis></Pagination.Ellipsis>)
            //     };

            // } else {
                items.push(
                    <Pagination.Item
                        key={number}
                        active={number === page}
                        onClick={() => onPageChange(number)}>
                        {number}
                    </Pagination.Item>,
                );
            // }
        }
        return items;
    };

    return (
        <Pagination>
            {generatePaginationItems().map((item) => item)}
        </Pagination>
    )
};

export default PaginationComponent;