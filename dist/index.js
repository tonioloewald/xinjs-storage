
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $722ee6daa27bfa02$exports = {};

$parcel$export($722ee6daa27bfa02$exports, "IndexedStorage", () => $722ee6daa27bfa02$export$41a78aa1acdd6131);
$parcel$export($722ee6daa27bfa02$exports, "indexedStorage", () => $722ee6daa27bfa02$export$5281f72867bab9d2);
/**
 * Minimal Wrapper for indexedDB
 *
 * Based on this gist
 * https://gist.github.com/JamesMessinger/a0d6389a5d0e3a24814b
 */ const { indexedDB: $722ee6daa27bfa02$var$indexedDB } = window;
class $722ee6daa27bfa02$export$41a78aa1acdd6131 {
    static VERSION = 1;
    request;
    promiseFulfilled;
    dbPromise;
    success = ()=>{
        this.promiseFulfilled(this.request.result);
    };
    update = ()=>{
        const db = this.request.result;
        const store = db.createObjectStore('objects', {
            keyPath: 'id'
        });
    // store.createIndex("NameIndex", ['_created', '_modified'])
    };
    name;
    constructor(name){
        this.name = name;
        const request = $722ee6daa27bfa02$var$indexedDB.open(name, $722ee6daa27bfa02$export$41a78aa1acdd6131.VERSION);
        request.onsuccess = this.success;
        request.onupgradeneeded = this.update;
        this.dbPromise = new Promise((resolve)=>{
            this.promiseFulfilled = resolve;
        });
        this.request = request;
    }
    async setItem(id, value) {
        const db = await this.dbPromise;
        const tx = db.transaction('objects', 'readwrite');
        const store = tx.objectStore('objects');
        return new Promise((resolve, reject)=>{
            const req = store.put({
                id: id,
                value: value
            });
            req.onsuccess = ()=>resolve();
            req.onerror = ()=>reject(req.error);
        });
    }
    async getItem(id) {
        const db = await this.dbPromise;
        const tx = db.transaction('objects', 'readonly');
        const store = tx.objectStore('objects');
        return new Promise((resolve, reject)=>{
            const req = store.get(id);
            req.onsuccess = ()=>{
                resolve(req.result?.value != null ? req.result.value : undefined);
            };
            req.onerror = ()=>reject(req.error);
        });
    }
    async count() {
        const db = await this.dbPromise;
        const tx = db.transaction('objects', 'readonly');
        const store = tx.objectStore('objects');
        return new Promise((resolve, reject)=>{
            const req = store.count();
            req.onsuccess = ()=>{
                resolve(req.result);
            };
            req.onerror = ()=>reject(req.error);
        });
    }
    async allKeys() {
        const db = await this.dbPromise;
        const tx = db.transaction('objects', 'readonly');
        const store = tx.objectStore('objects');
        return new Promise((resolve, reject)=>{
            const req = store.getAllKeys();
            req.onsuccess = ()=>{
                resolve(req.result);
            };
            req.onerror = ()=>reject(req.error);
        });
    }
    async delete(id) {
        const db = await this.dbPromise;
        const tx = db.transaction('objects', 'readwrite');
        const store = tx.objectStore('objects');
        return new Promise((resolve, reject)=>{
            const req = store.delete(id);
            req.onsuccess = resolve;
            req.onerror = ()=>reject(req.error);
        });
    }
    async clear() {
        const db = await this.dbPromise;
        const tx = db.transaction('objects', 'readwrite');
        const store = tx.objectStore('objects');
        return new Promise((resolve, reject)=>{
            const req = store.clear();
            req.onsuccess = resolve;
            req.onerror = ()=>reject(req.error);
        });
    }
}
const $722ee6daa27bfa02$export$5281f72867bab9d2 = new $722ee6daa27bfa02$export$41a78aa1acdd6131('default-local-db');




export {$722ee6daa27bfa02$export$41a78aa1acdd6131 as IndexedStorage, $722ee6daa27bfa02$export$5281f72867bab9d2 as indexedStorage};
//# sourceMappingURL=index.js.map
