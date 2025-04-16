import { deno_connect } from "../src/denoconnector.js";
import { consolelog } from "./console.js";

const SMTP_SERVER = "smtp-mail.outlook.com"; //"smtp.gmail.com";//"smtp.zoho.com";//"smtp.yandex.com";//"mail.gmx.com";//"localhost";//"testtls.com";//
const SMTP_PORT = 587; // For TLS

const conn = await deno_connect({port:SMTP_PORT, hostname:SMTP_SERVER});

//1. read response from peer or server
let response = await conn.read_decode();
consolelog("read first msg", response);

//2. send EHLO mail 
response = await conn.write_string(`EHLO mail.example.com\r\n`);
consolelog("send EHLO", response);

//3. send STARTTLS
response = await conn.write_string("STARTTLS\r\n");
consolelog("send STARTTLS", response);

//4. send clienHelloRecord

conn.close();

