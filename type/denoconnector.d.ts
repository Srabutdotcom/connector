/**
 * Establishes a TCP connection using Deno's `Deno.connect` and returns a DenoConnect wrapper.
 *
 * @param {object} option - Connection options.
 * @param {number} option.port - The port to connect to (default: 587).
 * @param {string} option.hostname - The hostname or IP to connect to (default: "127.0.0.1").
 * @param {"tcp"} [option.transport="tcp"] - Transport type, must be "tcp".
 * @returns {Promise<DenoConnect>} A promise that resolves to a DenoConnect instance.
 * @throws {Error} Throws if connection fails.
 * @version 0.0.6
 */
export declare function deno_connect(option?: {
  port?: number;
  hostname?: string;
  transport?: "tcp";
}): Promise<DenoConnect>;

/**
 * A class for interacting with a Deno connection.
 */
declare class DenoConnect {
  #conn: any; //  Ideally, this should be a more specific type (e.g., Deno.Conn)

  /**
   * Constructs a DenoConnect instance.
   * @param conn The Deno connection object.
   */
  constructor(conn: any); //  Ideally, this should be a more specific type

  /**
   * Reads a chunk of data from the connection's readable stream.
   * @returns A Promise that resolves with the read Uint8Array, or undefined if the stream ends.
   */
  read_stream(): Promise<Uint8Array | undefined>;

  /**
   * Reads all records from the connection's readable stream.
   * @returns A Promise that resolves to an array of Uint8Array, where each Uint8Array is a record.
   */
  read_record(): Promise<Uint8Array[]>;

  /**
   * Reads lines from the connection's readable stream.
   * @returns A Promise that resolves to an array of strings, where each string is a line.
   */
  read_lines(): Promise<string[]>;

  /**
   * Reads data from the connection into a buffer.
   * @returns A Promise that resolves to a Uint8Array containing the read data.
   */
  read(): Promise<Uint8Array>;

  /**
   * Reads data from the connection and decodes it as a string.
   * @returns A Promise that resolves to the decoded string.
   */
  read_decode(): Promise<string>;

  /**
   * Writes data to the connection.
   * @param byte The data to write (Uint8Array or string).
   * @returns A Promise that resolves when the data is written.
   */
  write(byte: Uint8Array | string): Promise<number | void>;

  /**
   * Writes data to the connection and then reads a chunk of data.
   * @param byte The data to write (Uint8Array or string).
   * @returns A Promise that resolves with the read Uint8Array, or undefined if the stream ends.
   */
  write_read(byte: Uint8Array | string): Promise<Uint8Array | undefined>;

  /**
   * Writes data as a record to the connection and then reads the response records.
   * @param byte The data to write (Uint8Array or string).
   * @returns A Promise that resolves to an array of Uint8Array records.
   */
  write_record(byte: Uint8Array | string): Promise<Uint8Array[]>;

  /**
   * Writes a string to the connection and then reads and decodes the response.
   * @param string The string to write.
   * @returns A Promise that resolves to the string response.
   */
  write_string(string: string): Promise<string>;

  /**
   * Writes a string to the connection and then reads the lines of the response.
   * @param string The string to write.
   * @returns A Promise that resolves to an array of strings.
   */
  write_lines(string: string): Promise<string[]>;

  /**
   * Gets the underlying connection object.
   * @returns The connection object.
   */
  get conn(): any; //  Ideally, this should be a more specific type

  /**
   * Closes the connection.
   */
  close(): void;
}
