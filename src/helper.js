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
         if (records.at(-1)[0] == 23) data.done = true
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