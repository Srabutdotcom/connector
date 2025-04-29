//@ts-self-types="../type/nodeconnector.d.ts"
import net from "node:net"
import { parseRecord, join } from "./helper.js";

const decoder = new TextDecoder();

export function node_connect(option = { port: 587, host: "127.0.0.1" }) {
   return new Promise(resolve => {
      const socket = net.connect(option, () => {
         console.log('connected')
         resolve(new NodeConnect(socket))
      })
   })
}

class NodeConnect {
   #socket
   constructor(socket) {
      this.#socket = socket;
   }
   read() {
      return new Promise((resolve, reject) => {
         this.#socket.on("data", (data) => {
            //console.log(socket.data)
            resolve(data);
         });
         this.#socket.on("error", (error) => {
            reject(error)
         })
         this.#socket.on("close", () => {
            reject(Error(`Connection closed`))
         })
      });
   }
   write(data) {
      data = sanitize(data)
      this.#socket.write(data)
   }
   async read_string() {
      return decoder.decode(await this.read())
   }

   async read_record() {
      const data = {
         records: [],
         chunk: new Uint8Array,
         done: false
      }
      while (true) {
         const chunk = await this.read();
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
         const chunk = await this.read();
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

   async write_string(string) {
      this.write(string);
      return await this.read_string()
   }

   async write_read(byte) {
      this.write(byte);
      return await this.read();
   }

   async write_record(byte) {
      this.write(byte);
      return await this.read_record()
   }

   async write_lines(string) {
      this.write(string);
      return await this.read_lines()
   }

   close() {
      return this.#socket.destroy();
   }
}

function sanitize(data) {
   if (data instanceof Uint8Array) {
      return Uint8Array.from(data)
   }
   return data
}
