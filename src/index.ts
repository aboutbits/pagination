enum IndexType {
  ZERO_BASED,
  ONE_BASED,
}

const calculateVisiblePages = (
  page: number,
  firstPage: number,
  lastPage: number,
  maxPages: number
): number[] => {
  const range = Math.floor(maxPages / 2)
  let lowerBound = firstPage
  let lowerBoundRest = 0
  let upperBound = lastPage
  let upperBoundRest = 0

  if (page - range >= 1) {
    lowerBound = page - range
  } else {
    lowerBoundRest = (page - range - 1) * -1
  }

  if (page + range <= lastPage) {
    upperBound = page + range
  } else {
    upperBoundRest = (lastPage - range - page) * -1
  }

  if (upperBoundRest > 0) {
    lowerBound =
      lowerBound - upperBoundRest > 0 ? lowerBound - upperBoundRest : firstPage
  }

  if (lowerBoundRest > 0) {
    upperBound =
      upperBound + lowerBoundRest < lastPage
        ? upperBound + lowerBoundRest
        : lastPage
  }

  const pages = []

  for (let i = lowerBound; i <= upperBound; i++) {
    pages.push(i)
  }

  return pages
}

type CalculatePaginationConfig = {
  indexType: IndexType
  maxPages: number
}

const defaultCalculatePaginationConfig: CalculatePaginationConfig = {
  indexType: IndexType.ZERO_BASED,
  maxPages: 5,
}

const calculatePagination = (
  page: number,
  size: number,
  total: number,
  config?: Partial<CalculatePaginationConfig>
): {
  previous: {
    indexNumber: number
    isDisabled: boolean
  }
  next: {
    indexNumber: number
    isDisabled: boolean
  }
  pages: {
    indexNumber: number
    displayNumber: number
    isCurrent: boolean
  }[]
} | null => {
  const { indexType, maxPages } = {
    ...defaultCalculatePaginationConfig,
    ...config,
  }

  if (total <= size) {
    return null
  }

  const firstPage = indexType === IndexType.ZERO_BASED ? 0 : 1
  const lastPage = Math.ceil(total / size) + (firstPage - 1)
  const isCurrentTheFirstPage = page === firstPage
  const isCurrentTheLastPage = page === lastPage

  return {
    previous: {
      indexNumber: isCurrentTheFirstPage ? firstPage : page - 1,
      isDisabled: isCurrentTheFirstPage,
    },
    next: {
      indexNumber: isCurrentTheLastPage ? lastPage : page + 1,
      isDisabled: isCurrentTheLastPage,
    },
    pages: calculateVisiblePages(page, firstPage, lastPage, maxPages).map(
      (visiblePage) => {
        return {
          indexNumber: visiblePage,
          displayNumber:
            indexType === IndexType.ZERO_BASED ? visiblePage + 1 : visiblePage,
          isCurrent: visiblePage === page,
        }
      }
    ),
  }
}

export { calculatePagination, IndexType }
