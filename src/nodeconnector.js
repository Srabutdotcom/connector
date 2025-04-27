//@ts-self-types="../type/nodeconnector.d.ts"
import net from "node:net"
const decoder = new TextDecoder();

export function node_connect(option = { port: 587, host: "127.0.0.1"}){
   return new Promise(resolve=>{
      const socket = net.connect(option, ()=>{
         console.log('connected')
         resolve(new NodeConnect(socket))  
      })
   })
}

class NodeConnect {
   #socket
   constructor(socket){
      this.#socket = socket;
   }
   read(){
      return new Promise((resolve, reject) => {
         this.#socket.on("data", (data) => {
            //console.log(socket.data)
            resolve(data);
         });
         this.#socket.on("error", (error)=>{
            reject(error)
         })
         this.#socket.on("close", ()=>{
            reject(Error(`Connection closed`))
         })
      });
   }
   write(data){
      data = sanitize(data)
      this.#socket.write(data)
   }
   async read_string(){
      return decoder.decode(await this.read())
   }

   async write_string(string){
      this.write(string);
      return await this.read_string()
   }

   async write_read(byte){
      this.write(byte);
      return await await this.read();
   }

   close(){
      return this.#socket.destroy();
   }
}

function sanitize(data){
   if(data instanceof Uint8Array){
      if(Object.getPrototypeOf(data)==Uint8Array.prototype)return data;
      return Uint8Array.from(data)
   }
   return data
}
