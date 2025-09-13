/**
 * Minimal Wrapper for indexedDB
 *
 * Based on this gist
 * https://gist.github.com/JamesMessinger/a0d6389a5d0e3a24814b
 */

const { indexedDB } = window

export class IndexedStorage {
  static VERSION = 1

  private request: any
  private promiseFulfilled?: (db: any) => void
  private dbPromise: Promise<any>

  private success = () => {
    this.promiseFulfilled!(this.request.result)
  }

  private update = () => {
    const db = this.request.result
    const store = db.createObjectStore('objects', { keyPath: 'id' })
    // store.createIndex("NameIndex", ['_created', '_modified'])
  }

  readonly name: string

  constructor(name: string) {
    this.name = name
    const request = indexedDB.open(name, IndexedStorage.VERSION)
    request.onsuccess = this.success
    request.onupgradeneeded = this.update

    this.dbPromise = new Promise((resolve) => {
      this.promiseFulfilled = resolve
    })

    this.request = request
  }

  private async dispatch(
    method: 'put' | 'get' | 'count' | 'getAllKeys' | 'clear' | 'delete',
    value?: any
  ): Promise<any> {
    const db = await this.dbPromise
    const tx = db.transaction(
      'objects',
      ['put', 'clear', 'delete'].includes(method) ? 'readwrite' : 'readonly'
    )
    const store = tx.objectStore('objects')
    return new Promise((resolve, reject) => {
      const req = store[method](value)
      req.onsuccess = () =>
        resolve(req.result?.value != null ? req.result.value : req.result)
      req.onerror = () => reject(req.error)
    })
  }

  async setItem(id: string, value: any): Promise<void> {
    return this.dispatch('put', { id, value })
  }

  async getItem(id: string): Promise<any | undefined> {
    return this.dispatch('get', id)
  }

  async count(): Promise<number> {
    return this.dispatch('count')
  }

  async allKeys(): Promise<string[]> {
    return this.dispatch('getAllKeys')
  }

  async delete(id: string): Promise<void> {
    return this.dispatch('delete', id)
  }

  async clear(): Promise<void> {
    return this.dispatch('clear')
  }
}

export const indexedStorage = new IndexedStorage('default-local-db')
