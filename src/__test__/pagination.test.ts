import { calculatePagination } from '../index'

it('should return no pagination if not enough items are given', () => {
  const page = 1
  const size = 5
  const total = 2
  const pagination = calculatePagination(page, size, total)

  expect(pagination).toBeNull()
})
it('should return only a few pages', () => {
  const page = 2
  const size = 5
  const total = 15
  const pagination = calculatePagination(page, size, total)

  expect(pagination).not.toBeNull()
  expect(pagination?.pages).toHaveLength(3)

  expect(pagination?.pages[0].number).toBe(1)
  expect(pagination?.pages[0].isCurrentPage).toBeFalsy()
  expect(pagination?.pages[1].number).toBe(2)
  expect(pagination?.pages[1].isCurrentPage).toBeTruthy()
  expect(pagination?.pages[2].number).toBe(3)
  expect(pagination?.pages[2].isCurrentPage).toBeFalsy()
})
it('should return the maximum number of pages', () => {
  const page = 5
  const size = 5
  const total = 50
  const maxPages = 5
  const pagination = calculatePagination(page, size, total, maxPages)

  expect(pagination).not.toBeNull()
  expect(pagination?.pages).toHaveLength(5)

  expect(pagination?.pages[0].number).toBe(3)
  expect(pagination?.pages[0].isCurrentPage).toBeFalsy()
  expect(pagination?.pages[1].number).toBe(4)
  expect(pagination?.pages[1].isCurrentPage).toBeFalsy()
  expect(pagination?.pages[2].number).toBe(5)
  expect(pagination?.pages[2].isCurrentPage).toBeTruthy()
  expect(pagination?.pages[3].number).toBe(6)
  expect(pagination?.pages[3].isCurrentPage).toBeFalsy()
  expect(pagination?.pages[4].number).toBe(7)
  expect(pagination?.pages[4].isCurrentPage).toBeFalsy()
})
it('should disable the previous link', () => {
  const page = 1
  const size = 5
  const total = 10
  const pagination = calculatePagination(page, size, total)

  expect(pagination).not.toBeNull()

  expect(pagination?.previous.number).toBe(1)
  expect(pagination?.previous.isDisabled).toBeTruthy()

  expect(pagination?.next.number).toBe(2)
  expect(pagination?.next.isDisabled).toBeFalsy()

  expect(pagination?.pages[0].isCurrentPage).toBeTruthy()
  expect(pagination?.pages[1].isCurrentPage).toBeFalsy()
})
it('should disable the next link', () => {
  const page = 2
  const size = 5
  const total = 10
  const pagination = calculatePagination(page, size, total)

  expect(pagination).not.toBeNull()

  expect(pagination?.previous.number).toBe(1)
  expect(pagination?.previous.isDisabled).toBeFalsy()

  expect(pagination?.next.number).toBe(2)
  expect(pagination?.next.isDisabled).toBeTruthy()

  expect(pagination?.pages[0].isCurrentPage).toBeFalsy()
  expect(pagination?.pages[1].isCurrentPage).toBeTruthy()
})
