
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
    async dispatch(method, value) {
        const db = await this.dbPromise;
        const tx = db.transaction('objects', [
            'put',
            'clear',
            'delete'
        ].includes(method) ? 'readwrite' : 'readonly');
        const store = tx.objectStore('objects');
        return new Promise((resolve, reject)=>{
            const req = store[method](value);
            req.onsuccess = ()=>resolve(req.result?.value != null ? req.result.value : req.result);
            req.onerror = ()=>reject(req.error);
        });
    }
    async setItem(id, value) {
        return this.dispatch('put', {
            id: id,
            value: value
        });
    }
    async getItem(id) {
        return this.dispatch('get', id);
    }
    async count() {
        return this.dispatch('count');
    }
    async allKeys() {
        return this.dispatch('getAllKeys');
    }
    async delete(id) {
        return this.dispatch('delete', id);
    }
    async clear() {
        return this.dispatch('clear');
    }
}
const $722ee6daa27bfa02$export$5281f72867bab9d2 = new $722ee6daa27bfa02$export$41a78aa1acdd6131('default-local-db');




export {$722ee6daa27bfa02$export$41a78aa1acdd6131 as IndexedStorage, $722ee6daa27bfa02$export$5281f72867bab9d2 as indexedStorage};
//# sourceMappingURL=index.js.map
