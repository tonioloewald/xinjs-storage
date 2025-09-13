# xinjs-storage

[xinjs](https://xinjs.net) [discord](https://discord.gg/ramJ9rgky5) [github](https://github.com/tonioloewald/xinjs-storage#readme) [npm](https://www.npmjs.com/package/xinjs-storage) <size-break min-width="500"><img alt="bundlejs" src="https://deno.bundlejs.com/?q=xinjs-storage&badge="></size-break>
Copyright ©2023 Tonio Loewald

## What is it?

`xinjs-storage` is an ultra-lightweight wrapper for indexedDB that gives you
bascially a _near_ drop-in replacement for `localStorage` that is built on `indexedDB`
and therefore doesn't run into size limits.

It also lets you create as many different named stores as you like.

Why not drop-in? `indexedDB` is asynchronous and has a _horrible_ API. `xinjs-storage`
wraps everything in promises but it's still async.

## Why?

There are other wrappers for indexedDB but they aren't _teensy_. People get
enticed by the robust looking database features and forget Javascript actually
does all that _faster_, and in a language you already know and use, so why bother?

## Installation

```
npm i -d xinjs-storage
```

## Usage

```
import { indexedStorage } from 'xinjs-storage'

await indexedStorage.setItem('foo', {bar: 'baz'})
const greatMovie = await indexedStorage.getItem('luhrmann')
```

## Methods

You get the methods you expect and need, and nothing else.

```
async indexedStorage.setItem(id: string, value: any): Promise<void>
async indexedStorage.getItem(id: string): Promise<any | undefined>
async indexedStorage.count(): Promise<number>
async indexedStorage.allKeys(): Promise<string[]>
asnyc indexedStorage.delete(id: string): Promise<void>
async indexedStorage.clear(): Promise<void>
```

## Class

If you want to create multiple stores for some reason (e.g. you might be merging
two projects that each use their own), there's actually an `IndexedStorage` class.

```
import { IndexedStorage } from 'xinjs-storage'

const myStorage = new IndexedStorage('my-unique-name')
```

## VERSION

The `IndexedStorage` class has a single static property `VERSION` that versions
the store so if the schema ever needs to be updated…

## A Useful Hint

To find out how much local storage you're wasting, you can use

```
await navigator.storage.estimate()
```

in your browser's console.

## Developers

This project was built using `bun` as well as `nodejs`. If you don't want to use
`bun` (e.g. you use Windows and not the linux environment) you can just replace
all the references to `bun` in the scripts with `npm` and it should all work
(but slower…).

You can get bun [here](https://bun.sh/).

1. npm install
2. bun install
3. bun start // launch the test server
4. bun test // runs tests using puppeteer
5. bun package // build the libraries

## The Future

Ultimately, the goal is simply to allow you to add your own **Firebase** app
config and then transparently persist storage to the cloud with a sensible
security model. In this universe, `xinjs-storage` will also provide a transparent
local cache for **synced** collections.
