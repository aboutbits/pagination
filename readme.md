Pagination
==========

[![npm package](https://badge.fury.io/js/%40aboutbits%2Fpagination.svg)](https://badge.fury.io/js/%40aboutbits%2Fpagination)
[![license](https://img.shields.io/github/license/aboutbits/pagination)](https://github.com/aboutbits/pagination/blob/master/license.md)

This pagacke includes a pagination calculation, where you can simply pass some basic information to the calcualtion function, and in return you receive an object with all relevant pagination information.

## Table of content

- [Usage](#usage)
- [Build & Publish](#build--publish)
- [Information](#information)

## Usage

First, you have to install the package:

```bash
npm install @aboutbits/pagination
```

Second, you can call the calculate function by passing the following information:

- `page`: The current page
- `size`: The amount of items shown per page
- `total`: The amount of total items in the list/collection
- `config`: A configuration object containing the following possible configuration values:
  - `indexType`: The starting point of the pagination (default: IndexType.ONE_BASED)
  - `maxPages`: The maximum amount of pages that should be shown (default: 5)

In return, you receive an object with all relevant information:

```js
import { calculatePagination } from '@aboutbits/pagination'

let pagination = calculatePagination(1, 5, 100)

console.log(pagination)
```

This would return the following object:

```json
{
  "previous": {
    "indexNumber": 1,
    "isDisabled": true
  },
  "next": {
    "indexNumber": 2,
    "isDisabled": false
  },
  "pages": [
    {
      "indexNumber": 1,
      "displayNumber": 1,
      "isCurrent": true
    },
    {
      "indexNumber": 2,
      "displayNumber": 2,
      "isCurrent": false
    },
    {
      "indexNumber": 3,
      "displayNumber": 3,
      "isCurrent": false
    },
    {
      "indexNumber": 4,
      "displayNumber": 4,
      "isCurrent": false
    },
    {
      "indexNumber": 5,
      "displayNumber": 5,
      "isCurrent": false
    }
  ]
}
```

## Build & Publish

To build and publish the package, simply commit all changes and push them to master. Then run one of the following commands locally:

```bash
npm version patch
npm version minor
npm version major
```

## Information

About Bits is a company based in South Tyrol, Italy. You can find more information about us on [our website](https://aboutbits.it).

### Support

For support, please contact [info@aboutbits.it](mailto:info@aboutbits.it).

### Credits

- [Alex Lanz](https://github.com/alexlanz)
- [Martin Malfertheiner](https://github.com/mmalfertheiner)
- [All Contributors](../../contributors)

### License

The MIT License (MIT). Please see the [license file](license.md) for more information.
