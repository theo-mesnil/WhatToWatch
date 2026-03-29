/* eslint-disable no-undef */
// Fix for Expo 55 ReadableStream polyfill conflicting with axios fetch adapter.
// The polyfill overrides globalThis.ReadableStream with a version whose cancel()
// throws synchronously when the stream has a reader, breaking axios feature detection.
// Restore Node's native ReadableStream before any modules load.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ReadableStream: NativeReadableStream } = require('stream/web')
globalThis.ReadableStream = NativeReadableStream
