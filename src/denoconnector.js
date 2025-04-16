//@ts-self-types="../type/denoconnector.d.ts"
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

   async read_stream(){
      for await(const chunk of this.#conn.readable.values({ preventCancel: true })){
         return chunk
      }
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
      return await this.#conn.write(byte)
   }

   async write_read(byte) {
      const _bytes_written = await this.write(byte);
      return await this.read_stream();
   }

   async write_string(string) {
      const _bytes_written = await this.write(encoder.encode(string));
      return await this.read_decode()
   }

   get conn() {
      return this.#conn;
   }

   close() {
      this.#conn.close();
   }
}