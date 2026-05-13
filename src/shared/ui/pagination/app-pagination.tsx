import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
} from "./pagination.tsx";

import DoubleArrowLeftIcon from "@/shared/assets/icons/double-arrows-left.svg?react";
import DoubleArrowRightIcon from "@/shared/assets/icons/double-arrows-right.svg?react";
import ArrowLeftIcon from "@/shared/assets/icons/arrow-left.svg?react";
import ArrowRightIcon from "@/shared/assets/icons/arrow-right.svg?react";

type TPaginationPage = number | "ellipsis";

type TAppPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const MAX_VISIBLE_PAGES = 7;

const getPaginationPages = (
  page: number,
  totalPages: number,
): TPaginationPage[] => {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 2) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (page >= totalPages - 2) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
};

export const AppPagination = ({
  page,
  totalPages,
  onPageChange,
}: TAppPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPaginationPages(page, totalPages);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const goToPage = (nextPage: number) => {
    if (nextPage < 1) return;
    if (nextPage > totalPages) return;
    if (nextPage === page) return;

    onPageChange(nextPage);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationButton
            disabled={isFirstPage}
            aria-label="Первая страница"
            onClick={() => goToPage(1)}
          >
            <DoubleArrowLeftIcon />
          </PaginationButton>
        </PaginationItem>

        <PaginationItem>
          <PaginationButton
            disabled={isFirstPage}
            aria-label="Предыдущая страница"
            onClick={() => goToPage(page - 1)}
          >
            <ArrowLeftIcon />
          </PaginationButton>
        </PaginationItem>

        {pages.map((pageItem, index) => (
          <PaginationItem key={`${pageItem}-${index}`}>
            {pageItem === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationButton
                isActive={page === pageItem}
                onClick={() => goToPage(pageItem)}
              >
                {pageItem}
              </PaginationButton>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationButton
            disabled={isLastPage}
            aria-label="Следующая страница"
            onClick={() => goToPage(page + 1)}
          >
            <ArrowRightIcon />
          </PaginationButton>
        </PaginationItem>

        <PaginationItem>
          <PaginationButton
            disabled={isLastPage}
            aria-label="Последняя страница"
            onClick={() => goToPage(totalPages)}
          >
            <DoubleArrowRightIcon />
          </PaginationButton>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
