/**
 * Establishes a TCP connection using Deno's `Deno.connect` and returns a DenoConnect wrapper.
 *
 * @param {object} option - Connection options.
 * @param {number} option.port - The port to connect to (default: 587).
 * @param {string} option.hostname - The hostname or IP to connect to (default: "127.0.0.1").
 * @param {"tcp"} [option.transport="tcp"] - Transport type, must be "tcp".
 * @returns {Promise<DenoConnect>} A promise that resolves to a DenoConnect instance.
 * @throws {Error} Throws if connection fails.
 * @version 0.0.5
 */
export declare function deno_connect(option?: {
  port?: number;
  hostname?: string;
  transport?: "tcp";
}): Promise<DenoConnect>;

/**
 * Wrapper around Deno.Conn that provides convenient read/write utilities.
 */
export declare class DenoConnect {
  readonly #conn: Deno.Conn;

  /**
   * Creates a new DenoConnect instance.
   * @param {Deno.Conn} conn - The underlying Deno TCP connection.
   */
  constructor(conn: Deno.Conn);

  /**
   * Reads the next chunk from the connection stream (one-time read).
   * @returns {Promise<Uint8Array>} The received bytes.
   */
  read_stream(): Promise<Uint8Array>;

  /**
   * Reads data from the connection using a fixed-size buffer.
   * @returns {Promise<Uint8Array>} The read data.
   * @throws {Error} Throws if the connection is closed.
   */
  read(): Promise<Uint8Array>;

  /**
   * Reads a UTF-8 decoded string from the stream.
   * @returns {Promise<string>} The decoded string.
   */
  read_decode(): Promise<string>;

  /**
   * Writes raw bytes to the connection.
   * @param {Uint8Array} data - The bytes to send.
   * @returns {Promise<number>} The number of bytes written.
   */
  write(data: Uint8Array): Promise<number>;

  /**
   * Writes bytes to the connection, then waits and reads a response.
   * @param {Uint8Array} byte - The bytes to write.
   * @returns {Promise<Uint8Array>} The response data.
   */
  write_read(byte: Uint8Array): Promise<Uint8Array>;

  /**
   * Writes a string to the connection and reads back the decoded response.
   * @param {string} string - The string to send.
   * @returns {Promise<string>} The decoded response string.
   */
  write_string(string: string): Promise<string>;

  /**
   * Returns the underlying Deno TCP connection.
   * @returns {Deno.Conn} The connection object.
   */
  get conn(): Deno.Conn;

  /**
   * Closes the connection.
   */
  close(): void;
}
