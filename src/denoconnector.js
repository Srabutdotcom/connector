//@ts-self-types="../type/denoconnector.d.ts"
import { parseRecord, join } from "./helper.js";
const decoder = new TextDecoder();
const encoder = new TextEncoder();

export async function deno_connect(option = { port: 587, hostname: "127.0.0.1", transport: "tcp" }) {
   try {
      const conn = await Deno.connect(option);
      return new DenoConnect(conn);
   } catch (error) {
      throw new Error(`Failed to connect: ${error.message}`);
   }
}

class DenoConnect {
   #conn

   constructor(conn) {
      this.#conn = conn;
   }

   async read_stream() {
      for await (const chunk of this.#conn.readable.values({ preventCancel: true })) {
         return chunk
      }
   }

   async read_record() {
      const data = {
         records: [],
         chunk: new Uint8Array,
         done: false
      }
      while (true) {
         const chunk = await this.read_stream();
         if (chunk) {
            data.chunk = join(data.chunk, chunk);
            parseRecord(data)
            if (data.done) break;
            continue;
         }
         break;
      }
      return data.records;
   }

   async read_lines() {
      const lines = [];
      while (true) {
         const chunk = await this.read_stream();
         if (chunk) {
            const string = decoder.decode(chunk);
            lines.push(...string.split(/\r?\n/).filter(Boolean));
            const [, _code, space, _message] = lines.at(-1).match(/^(\d{3})([-\s])(.*)$/);
            if (/\s/.test(space)) break;
            continue;
         };
         break;
      }
      return lines
   }

   async read() {
      const buffer = new Uint8Array(8192)
      const bytesRead = await this.#conn.read(buffer);
      return buffer.slice(0, bytesRead);
   }

   async read_decode() {
      const bufferRead = await this.read_stream();
      return decoder.decode(bufferRead)
   }

   async write(byte) {
      byte = sanitize(byte)
      return await this.#conn.write(byte)
   }

   async write_read(byte) {
      const _bytes_written = await this.write(byte);
      return await this.read_stream();
   }

   async write_record(byte) {
      const _bytes_written = await this.write(byte);
      return await this.read_record();
   }

   async write_string(string) {
      const _bytes_written = await this.write(encoder.encode(string));
      return await this.read_decode()
   }

   async write_lines(string) {
      const _bytes_written = await this.write(encoder.encode(string));
      return await this.read_lines();
   }

   get conn() {
      return this.#conn;
   }

   close() {
      this.#conn.close();
   }
}

function sanitize(byte) {
   if (byte instanceof Uint8Array) return Uint8Array.from(byte);
   throw new TypeError(`Expected Uint8Array`)
}
