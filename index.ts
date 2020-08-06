const calculateVisiblePages = (
  page: number,
  total: number,
  maxPages: number
): number[] => {
  const range = Math.floor(maxPages / 2)
  let lowerBound = 1
  let lowerBoundRest = 0
  let upperBound = total
  let upperBoundRest = 0

  if (page - range >= 1) {
    lowerBound = page - range
  } else {
    lowerBoundRest = (page - range - 1) * -1
  }

  if (page + range <= total) {
    upperBound = page + range
  } else {
    upperBoundRest = (total - range - page) * -1
  }

  if (upperBoundRest > 0) {
    lowerBound =
      lowerBound - upperBoundRest > 0 ? lowerBound - upperBoundRest : 1
  }

  if (lowerBoundRest > 0) {
    upperBound =
      upperBound + lowerBoundRest < total ? upperBound + lowerBoundRest : total
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
  maxPages: number = 5
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
    isCurrentPage: boolean
  }[]
} | null => {
  if (total <= size) {
    return null
  }

  const lastPage = Math.ceil(total / size)
  const isCurrentTheFirstPage = page === 1
  const isCurrentTheLastPage = page === lastPage

  return {
    previous: {
      number: isCurrentTheFirstPage ? 1 : page - 1,
      isDisabled: isCurrentTheFirstPage,
    },
    next: {
      number: isCurrentTheLastPage ? lastPage : page + 1,
      isDisabled: isCurrentTheLastPage,
    },
    pages: calculateVisiblePages(page, lastPage, maxPages).map(
      (visiblePage) => {
        return {
          number: visiblePage,
          isCurrentPage: visiblePage === page,
        }
      }
    ),
  }
}

export { calculatePagination }
