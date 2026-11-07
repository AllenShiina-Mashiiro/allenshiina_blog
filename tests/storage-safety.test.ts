import test from "node:test";
import assert from "node:assert/strict";
import {mkdtemp,readFile,rm} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {randomUUID} from "node:crypto";
import {deleteStorageKeys,localUploadPath,validateImageBytes,writeLocalObject} from "../src/lib/storage";

test("local storage rejects traversal and non-UUID keys",()=>{
 assert.throws(()=>localUploadPath("local/../../outside"));
 assert.throws(()=>localUploadPath("local/not-a-uuid"));
});

test("local storage write and delete only affect the generated asset key",async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),"asset-safety-"));
 const previous=process.env.UPLOAD_DIR;
 process.env.UPLOAD_DIR=dir;
 const key=`local/${randomUUID()}`;
 try{
  await writeLocalObject(key,Buffer.from("safe-image-data"));
  assert.equal((await readFile(localUploadPath(key))).toString(),"safe-image-data");
  await deleteStorageKeys([key]);
  await assert.rejects(readFile(localUploadPath(key)),{code:"ENOENT"});
 }finally{
  if(previous===undefined)delete process.env.UPLOAD_DIR;else process.env.UPLOAD_DIR=previous;
  await rm(dir,{recursive:true,force:true});
 }
});

test("image verification rejects mismatched file signatures",()=>{
 assert.throws(()=>validateImageBytes(Buffer.from("not a png"),"image/png"));
 assert.doesNotThrow(()=>validateImageBytes(Buffer.from([0xff,0xd8,0xff,0x00]),"image/jpeg"));
});
