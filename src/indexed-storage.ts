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

  private _name: string

  get name(): string {
    return this._name
  }

  constructor(name: string) {
    this._name = name
    const request = indexedDB.open(name, IndexedStorage.VERSION)
    request.onsuccess = this.success
    request.onupgradeneeded = this.update

    this.dbPromise = new Promise((resolve) => {
      this.promiseFulfilled = resolve
    })

    this.request = request
  }

  async setItem(id: string, value: any): Promise<void> {
    const db = await this.dbPromise
    const tx = db.transaction('objects', 'readwrite')
    const store = tx.objectStore('objects')
    return new Promise((resolve) => {
      const req = store.put({ id, value })
      req.onsuccess = resolve
    })
  }

  async getItem(id: string): Promise<any | undefined> {
    const db = await this.dbPromise
    const tx = db.transaction('objects', 'readwrite')
    const store = tx.objectStore('objects')
    return new Promise((resolve) => {
      const req = store.get(id)
      req.onsuccess = () => {
        resolve(req.result?.value != null ? req.result.value : undefined)
      }
    })
  }

  async count(): Promise<number> {
    const db = await this.dbPromise
    const tx = db.transaction('objects', 'readwrite')
    const store = tx.objectStore('objects')
    return new Promise((resolve) => {
      const req = store.count()
      req.onsuccess = () => {
        resolve(req.result)
      }
    })
  }

  async allKeys(): Promise<number> {
    const db = await this.dbPromise
    const tx = db.transaction('objects', 'readwrite')
    const store = tx.objectStore('objects')
    return new Promise((resolve) => {
      const req = store.getAllKeys()
      req.onsuccess = () => {
        resolve(req.result)
      }
    })
  }

  async delete(id: string): Promise<void> {
    const db = await this.dbPromise
    const tx = db.transaction('objects', 'readwrite')
    const store = tx.objectStore('objects')
    return new Promise((resolve) => {
      const req = store.delete(id)
      req.onsuccess = resolve
    })
  }

  async clear(): Promise<void> {
    const db = await this.dbPromise
    const tx = db.transaction('objects', 'readwrite')
    const store = tx.objectStore('objects')
    return new Promise((resolve) => {
      const req = store.clear()
      req.onsuccess = resolve
    })
  }
}

export const indexedStorage = new IndexedStorage('default-local-db')
