import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui";

interface ListPaginationProps {
  page: number;
  setPage: (page: number) => void;
  limit?: number;
  totalPages?: number;
}

export default function ListPagination({
  page,
  setPage,
  totalPages,
}: ListPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))} />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive>
            {page}/{totalPages ?? 1}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem className="cursor-pointer">
          <PaginationNext
            onClick={() => setPage(Math.min(totalPages ?? page, page + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
