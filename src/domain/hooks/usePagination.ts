import { useEffect, useState } from "react";


interface IUsePagination {
    total: number;
    limit: number;
    action: (data: any) => void;
    onFetch: (page: number, limit: number) => Promise<any>;
}
const usePagination = ({ total, limit, action, onFetch }: IUsePagination) => {

    const [page, setPage] = useState(1);


    const fetch = async () => {
        const data = await onFetch(page, limit);

        if (data) action(data);
    };

    useEffect(() => {
        if (page > 0 && page <= Math.ceil(total / limit)) {
            fetch();
        }
    }, [page])


    return [page, setPage] as const;
};

export default usePagination;