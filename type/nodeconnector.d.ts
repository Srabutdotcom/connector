import net from "node:net";

/**
 * Establishes a connection to a TCP server.
 *
 * @param {object} [option] - The connection options.
 * @param {string} [option.host] - The hostname or IP address of the server. Default is '127.0.0.1'.
 * @param {number} [option.port] - The port number of the server. Default is 587.
 * @returns {Promise<NodeConnect>} A Promise that resolves with a NodeConnect instance upon successful connection.
<<<<<<< HEAD
 * @version 0.0.5
=======
 * @version 0.0.5
>>>>>>> 057ff26333ac56fed5cab56f01119a5d3da3e679
 */
export function node_connect(option?: { host?: string; port?: number }): Promise<NodeConnect>;

/**
 * A class that wraps a Node.js socket to provide simplified communication.
 */
declare class NodeConnect {
    /**
     * Creates a new NodeConnect instance.
     * @param {net.Socket} socket - The Node.js socket object.
     */
    constructor(socket: net.Socket);

    /**
     * Reads data from the socket.
     *
     * @returns {Promise<Buffer>} A Promise that resolves with the data read from the socket.
     */
    read(): Promise<Uint8Array>;

    /**
     * Writes data to the socket.
     *
     * @param {string | Buffer} data - The data to write to the socket.
     */
    write(data: string | Uint8Array): void;

    /**
     * Reads a string from the socket.
     *
     * @returns {Promise<string>} A Promise that resolves with the string read from the socket.
     */
    read_string(): Promise<string>;

    /**
     * Writes a string to the socket and then reads a response as a string.
     *
     * @param {string} string - The string to write to the socket.
     * @returns {Promise<string>} A Promise that resolves with the string response read from the socket.
     */
    write_string(string: string): Promise<string>;

    /**
     * Writes data to the socket and then reads a response as raw bytes.
     *
     * @param {Buffer} byte - The data to write to the socket.
     * @returns {Promise<Buffer>} A Promise that resolves with the raw byte response read from the socket.
     */
    write_read(byte: Uint8Array): Promise<Uint8Array>;

    /**
     * Closes the socket connection.
     *
     * @returns {void}
     */
    close(): void;
}

export { NodeConnect };
