import { calculatePagination, IndexType } from '../index'

it('should return no pagination if not enough items are given', () => {
  const page = 1
  const size = 5
  const total = 2
  const pagination = calculatePagination(page, size, total, {
    indexType: IndexType.ONE_BASED,
  })

  expect(pagination).toBeNull()
})
it('should return only a few pages', () => {
  const page = 2
  const size = 5
  const total = 15
  const pagination = calculatePagination(page, size, total, {
    indexType: IndexType.ONE_BASED,
  })

  expect(pagination).not.toBeNull()
  expect(pagination?.pages).toHaveLength(3)

  expect(pagination?.pages[0].indexNumber).toBe(1)
  expect(pagination?.pages[0].displayNumber).toBe(1)
  expect(pagination?.pages[0].isCurrent).toBeFalsy()
  expect(pagination?.pages[1].indexNumber).toBe(2)
  expect(pagination?.pages[1].displayNumber).toBe(2)
  expect(pagination?.pages[1].isCurrent).toBeTruthy()
  expect(pagination?.pages[2].indexNumber).toBe(3)
  expect(pagination?.pages[2].displayNumber).toBe(3)
  expect(pagination?.pages[2].isCurrent).toBeFalsy()
})
it('should return the maximum number of pages', () => {
  const page = 5
  const size = 5
  const total = 50
  const maxPages = 5
  const pagination = calculatePagination(page, size, total, {
    indexType: IndexType.ONE_BASED,
    maxPages: maxPages,
  })

  expect(pagination).not.toBeNull()
  expect(pagination?.pages).toHaveLength(5)

  expect(pagination?.pages[0].indexNumber).toBe(3)
  expect(pagination?.pages[0].displayNumber).toBe(3)
  expect(pagination?.pages[0].isCurrent).toBeFalsy()
  expect(pagination?.pages[1].indexNumber).toBe(4)
  expect(pagination?.pages[1].displayNumber).toBe(4)
  expect(pagination?.pages[1].isCurrent).toBeFalsy()
  expect(pagination?.pages[2].indexNumber).toBe(5)
  expect(pagination?.pages[2].displayNumber).toBe(5)
  expect(pagination?.pages[2].isCurrent).toBeTruthy()
  expect(pagination?.pages[3].indexNumber).toBe(6)
  expect(pagination?.pages[3].displayNumber).toBe(6)
  expect(pagination?.pages[3].isCurrent).toBeFalsy()
  expect(pagination?.pages[4].indexNumber).toBe(7)
  expect(pagination?.pages[4].displayNumber).toBe(7)
  expect(pagination?.pages[4].isCurrent).toBeFalsy()
})
it('should disable the previous link', () => {
  const page = 1
  const size = 5
  const total = 10
  const pagination = calculatePagination(page, size, total, {
    indexType: IndexType.ONE_BASED,
  })

  expect(pagination).not.toBeNull()

  expect(pagination?.previous.indexNumber).toBe(1)
  expect(pagination?.previous.isDisabled).toBeTruthy()

  expect(pagination?.next.indexNumber).toBe(2)
  expect(pagination?.next.isDisabled).toBeFalsy()

  expect(pagination?.pages[0].isCurrent).toBeTruthy()
  expect(pagination?.pages[1].isCurrent).toBeFalsy()
})
it('should disable the next link', () => {
  const page = 2
  const size = 5
  const total = 10
  const pagination = calculatePagination(page, size, total, {
    indexType: IndexType.ONE_BASED,
  })

  expect(pagination).not.toBeNull()

  expect(pagination?.previous.indexNumber).toBe(1)
  expect(pagination?.previous.isDisabled).toBeFalsy()

  expect(pagination?.next.indexNumber).toBe(2)
  expect(pagination?.next.isDisabled).toBeTruthy()

  expect(pagination?.pages[0].isCurrent).toBeFalsy()
  expect(pagination?.pages[1].isCurrent).toBeTruthy()
})
