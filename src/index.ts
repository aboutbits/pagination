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

const calculatePagination = (
  page: number,
  size: number,
  total: number,
  config?: {
    firstPage?: number
    maxPages?: number
  }
): {
  previous: {
    number: number
    isDisabled: boolean
  }
  next: {
    number: number
    isDisabled: boolean
  }
  pages: {
    number: number
    isCurrent: boolean
  }[]
} | null => {
  if (total <= size) {
    return null
  }

  const firstPage = config?.firstPage ?? 1
  const maxPages = config?.maxPages ?? 5

  const lastPage = Math.ceil(total / size) + (firstPage - 1)
  const isCurrentTheFirstPage = page === firstPage
  const isCurrentTheLastPage = page === lastPage

  return {
    previous: {
      number: isCurrentTheFirstPage ? firstPage : page - 1,
      isDisabled: isCurrentTheFirstPage,
    },
    next: {
      number: isCurrentTheLastPage ? lastPage : page + 1,
      isDisabled: isCurrentTheLastPage,
    },
    pages: calculateVisiblePages(page, firstPage, lastPage, maxPages).map(
      (visiblePage) => {
        return {
          number: visiblePage,
          isCurrent: visiblePage === page,
        }
      }
    ),
  }
}

export { calculatePagination }
