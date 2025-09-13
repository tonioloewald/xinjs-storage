export class IndexedStorage {
    static VERSION: number;
    readonly name: string;
    constructor(name: string);
    setItem(id: string, value: any): Promise<void>;
    getItem(id: string): Promise<any | undefined>;
    count(): Promise<number>;
    allKeys(): Promise<string[]>;
    delete(id: string): Promise<void>;
    clear(): Promise<void>;
}
export const indexedStorage: IndexedStorage;

//# sourceMappingURL=types.d.ts.map
