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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";

type TPaginationPage = number | "ellipsis";

type TAppPaginationProps = {
  page: number;
  limit: number;
  totalCount: number;
  limitOptions?: number[];
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

const MAX_VISIBLE_PAGES = 7;
const DEFAULT_LIMIT_OPTIONS = [6, 12, 24, 50];

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
  limit,
  totalCount,
  limitOptions = DEFAULT_LIMIT_OPTIONS,
  onPageChange,
  onLimitChange,
}: TAppPaginationProps) => {
  const totalPages = Math.max(Math.ceil(totalCount / limit), 1);
  const pages = getPaginationPages(page, totalPages);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const from = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalCount);

  const goToPage = (nextPage: number) => {
    if (nextPage < 1) return;
    if (nextPage > totalPages) return;
    if (nextPage === page) return;

    onPageChange(nextPage);
  };

  return (
    <div className="flex items-center w-full gap-4">
      <div className="flex flex-1 justify-start body-overline">
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span>
            {from}-{to}
          </span>
          <span>из</span>
          <span>{totalCount}</span>
        </span>
      </div>

      <div className="flex shrink-0 justify-center">
        {totalPages > 1 ? (
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
        ) : null}
      </div>

      <div className="flex flex-1 justify-end">
        <div className="flex items-center gap-2 whitespace-nowrap body-overline">
          <span>Карточек на странице:</span>

          <DropdownMenu>
            <DropdownMenuTrigger hasArrow className="px-2">
              {limit}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-5">
              <DropdownMenuRadioGroup
                value={String(limit)}
                onValueChange={(value) => {
                  onLimitChange(Number(value));
                }}
                className="flex flex-col gap-1"
              >
                {limitOptions.map((limitOption) => (
                  <DropdownMenuRadioItem
                    key={limitOption}
                    value={String(limitOption)}
                    className="cursor-pointer justify-center"
                  >
                    {limitOption}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
