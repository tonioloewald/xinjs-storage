/* eslint-disable */
// @ts-expect-error
import { test, expect } from 'bun:test'
import puppeteer from 'puppeteer'

test('it works', async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:7337')

  // initialize
  let count = await page.evaluate(async () => {
    await indexedStorage.clear()
    return await indexedStorage.count()
  })
  expect(count).toBe(0)
  let data = await page.evaluate(async () => {
    return await indexedStorage.getItem('baz')
  })
  expect(data).toBe(undefined)

  data = await page.evaluate(async () => {
    await indexedStorage.setItem('baz', { bar: 17 })
    return await indexedStorage.getItem('baz')
  })
  expect(data.bar).toBe(17)

  count = await page.evaluate(async () => {
    return await indexedStorage.count()
  })
  expect(count).toBe(1)

  data = await page.evaluate(async () => {
    await indexedStorage.setItem('baz', { luhrmann: 'foo' })
    return await indexedStorage.getItem('baz')
  })
  expect(data.bar).toBe(undefined)
  expect(data.luhrmann).toBe('foo')

  count = await page.evaluate(async () => {
    return await indexedStorage.count()
  })
  expect(count).toBe(1)

  count = await page.evaluate(async () => {
    await indexedStorage.setItem('foo', { bar: true })
    return await indexedStorage.count()
  })
  expect(count).toBe(2)

  count = await page.evaluate(async () => {
    await indexedStorage.delete('baz')
    return await indexedStorage.count()
  })
  expect(count).toBe(1)

  data = await page.evaluate(async () => {
    return indexedStorage.getItem('baz')
  })
  expect(data).toBe(undefined)

  // cleanup
  count = await page.evaluate(async () => {
    await indexedStorage.clear()
    return await indexedStorage.count()
  })
  expect(count).toBe(0)
})
