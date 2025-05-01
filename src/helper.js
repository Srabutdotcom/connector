export function parseRecord(data) {
   const { records, _chunk } = data;
   const offset = 0;
   while (true) {
      const lengthOf = (data.chunk[offset + 3] << 8) | data.chunk[offset + 4];
      const end = offset + 5 + lengthOf;
      if (data.chunk.length < end) break;
      const record = data.chunk.subarray(offset, end);
      records.push(record);
      data.chunk = data.chunk.subarray(record.length);
      if (data.chunk.length == 0) {
         if (records.at(-1)[0] == 23) data.done = true // if the last record is Application Data
         if (isHRR(records.at(0))) data.done = true; // if serverHelloRecord contain helloRetryRequest
         break;
      }
   }
   return data
}

export function join(existing, other) {
   const r = new Uint8Array(existing.length + other.length);
   r.set(existing, 0);
   r.set(other, existing.length);
   return r;
}

function isHRR(record) {
   return record.subarray(11, 43).toString() == "207,33,173,116,229,154,97,17,190,29,140,2,30,101,184,145,194,162,17,22,122,187,140,94,7,158,9,226,200,168,51,156"
}