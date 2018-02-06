import { isPromise, isNull, isObject, isPlainObject } from '.'


describe('isPromise()', () => {
  it('should return a boolean', () => {
    const expected = 'boolean'
    const actual = typeof isPromise(10)

    expect(actual).toEqual(expected)
  })

  it('should return true when value is a Promise', () => {
    const promise = Promise.resolve(10)

    const expected = true
    const actual = isPromise(promise)

    expect(actual).toEqual(expected)
  })

  it('should return false when value is NOT a Promise', () => {
    const vals = [
      1,
      'foobar',
      Symbol('foobar'),
      true,
      {},
      () => { },
      {
        then() { },
        catch() { },
      },
    ]

    vals.forEach((val) => {
      const expected = false
      const actual = isPromise(val)

      expect(actual).toEqual(expected)
    })
  })
})



describe('isNull()', () => {
  it('should return a boolean', () => {
    const expected = 'boolean'
    const actual = typeof isNull(10)

    expect(actual).toEqual(expected)
  })

  it('should return true when value is null', () => {
    const expected = true
    const actual = isNull(null)

    expect(actual).toEqual(expected)
  })

  it('should return false when value is NOT null', () => {
    const vals = [
      undefined,
      10,
      'foobar',
      true,
      {},
    ]

    vals.forEach((val) => {
      const expected = false
      const actual = isNull(val)

      expect(actual).toEqual(expected)
    })
  })
})



describe('isObject()', () => {
  it('should return a boolean', () => {
    const expected = 'boolean'
    const actual = typeof isObject(10)

    expect(actual).toEqual(expected)
  })

  it('should return true when value is a object', () => {
    const objs = [
      {},
      Object.create(null),
      [],
      /abc/g,
      Promise.resolve(10),
    ]

    objs.forEach((obj) => {
      const expected = true
      const actual = isObject(obj)

      expect(actual).toEqual(expected)
    })
  })

  it('should return false when value is NOT a object', () => {
    const vals = [
      undefined,
      null,
      10,
      'foobar',
      Symbol('foobar'),
      false,
      () => { },
    ]

    vals.forEach((val) => {
      const expected = false
      const actual = isObject(val)

      expect(actual).toEqual(expected)
    })
  })
})



describe('isPlainObject()', () => {
  it('should return a boolean', () => {
    const expected = 'boolean'
    const actual = typeof isPlainObject(10)

    expect(actual).toEqual(expected)
  })

  it('should return true when value is a plain object', () => {
    const plainObj = {}

    const expected = true
    const actual = isPlainObject(plainObj)

    expect(actual).toEqual(expected)
  })

  it('should return false when value is NOT a object', () => {
    const vals = [
      undefined,
      null,
      10,
      'foobar',
      Symbol('foobar'),
      false,
      () => { },
    ]

    vals.forEach((val) => {
      const expected = false
      const actual = isPlainObject(val)

      expect(actual).toEqual(expected)
    })
  })

  it('should return false when value is NOT a plain object', () => {
    const notPlainObjs = [
      [],
      Object.create(null),
      Promise.resolve(10),
      new Date(),
      /abc/g,
    ]

    notPlainObjs.forEach((obj) => {
      const expected = false
      const actual = isPlainObject(obj)

      expect(actual).toEqual(expected)
    })
  })
})
