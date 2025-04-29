```markdown
# Deno TCP Connect
@version 0.0.6

A lightweight wrapper around `Deno.connect` to simplify reading and writing to TCP connections, with helper methods to handle strings and streams.

## Features

- Easy-to-use `DenoConnect` class
- Supports reading raw bytes or decoded strings
- Automatically wraps `Deno.connect` with error handling
- Convenient methods for writing data and reading responses
- Stream reading support

## Usage

### Import and connect:

```ts
import { deno_connect } from "./deno_connect.js";

const client = await deno_connect({ port: 587, hostname: "127.0.0.1" });
```

### Write and read:

```ts
await client.write_string("EHLO localhost\r\n");
const response = await client.read_decode();
console.log(response);
```

Or combine:

```ts
const response = await client.write_string("EHLO localhost\r\n");
console.log(response);
```

### Close the connection:

```ts
client.close();
```

---

## API

### `deno_connect(option)`

Creates and returns an instance of `DenoConnect`.

- `option.port`: TCP port (default: `587`)
- `option.hostname`: IP address or hostname (default: `127.0.0.1`)
- `option.transport`: transport protocol, typically `"tcp"` (default)

### `DenoConnect` methods

- `read()`: Reads bytes from the connection and returns a `Uint8Array`
- `read_stream()`: Reads from the stream using async iterator
- `read_decode()`: Reads from stream and returns a decoded UTF-8 string
- `write(byte: Uint8Array)`: Writes raw bytes to the connection
- `write_string(string: string)`: Encodes and writes a string, returns response as string
- `write_read(byte: Uint8Array)`: Writes then reads response as bytes
- `conn`: Getter for the raw `Deno.Conn`
- `close()`: Closes the connection

---

## Example Output

```txt
220 smtp.example.com ESMTP Postfix
250-smtp.example.com Hello localhost [127.0.0.1]
250 STARTTLS
```

---

## Notes

- Use `\r\n` for newline in SMTP or other text protocols.
- Avoid passing multiple arguments to `console.log()` if you want to control spacing/formatting exactly. Use template strings or concatenation.

---

### Donation

- [Support the project on PayPal](https://paypal.me/aiconeid)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
