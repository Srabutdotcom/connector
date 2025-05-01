import net from "node:net";

/**
 * Establishes a connection to a TCP server.
 *
 * @param {object} [option] - The connection options.
 * @param {string} [option.host] - The hostname or IP address of the server. Default is '127.0.0.1'.
 * @param {number} [option.port] - The port number of the server. Default is 587.
 * @returns {Promise<NodeConnect>} A Promise that resolves with a NodeConnect instance upon successful connection.
 * @version 0.0.7
 */
export function node_connect(option?: { host?: string; port?: number }): Promise<NodeConnect>;

/**
 * A class for interacting with a Node.js socket.
 */
declare class NodeConnect {
    #socket: any; //  Ideally, this should be a more specific type (e.g., net.Socket)
  
    /**
     * Constructs a NodeConnect instance.
     * @param socket The Node.js socket object.
     */
    constructor(socket: any);  //  Ideally, this should be a more specific type
  
    /**
     * Reads data from the socket.
     * @returns A Promise that resolves with the read data (Uint8Array).
     */
    read(): Promise<Uint8Array>;
  
    /**
     * Writes data to the socket.
     * @param data The data to write (Uint8Array or string).
     */
    write(data: Uint8Array | string): void;
  
    /**
     * Reads data from the socket and decodes it as a string.
     * @returns A Promise that resolves to the decoded string.
     */
    read_string(): Promise<string>;
  
      /**
      * Reads all records from the socket.
      * @returns A Promise that resolves to an array of Uint8Array, where each Uint8Array is a record.
      */
    read_record(): Promise<Uint8Array[]>;
  
    /**
     * Reads lines from the socket.
     * @returns A Promise that resolves to an array of strings, where each string is a line.
     */
    read_lines(): Promise<string[]>;
  
    /**
     * Writes a string to the socket and then reads the response as a string.
     * @param string The string to write.
     * @returns A Promise that resolves to the string response.
     */
    write_string(string: string): Promise<string>;
  
    /**
     * Writes data to the socket and then reads data from the socket.
     * @param byte The data to write (Uint8Array or string).
     * @returns A Promise that resolves with the read data (Uint8Array).
     */
    write_read(byte: Uint8Array | string): Promise<Uint8Array>;
  
    /**
    * Writes data as a record to the socket and then reads the response records.
    * @param byte The data to write (Uint8Array or string).
    * @returns A Promise that resolves to an array of Uint8Array records.
    */
    write_record(byte: Uint8Array | string): Promise<Uint8Array[]>;
  
    /**
     * Writes a string to the socket and then reads the lines of the response.
     * @param string The string to write.
     * @returns A Promise that resolves to an array of strings.
     */
    write_lines(string: string): Promise<string[]>;
  
    /**
     * Closes the socket.
     */
    close(): void;
  }

