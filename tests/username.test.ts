import test from "node:test";import assert from "node:assert/strict";import { validateUsername } from "../src/lib/username";
test("username accepts lowercase letters, digits and underscore",()=>{assert.equal(validateUsername("allen_shiina"),true);assert.equal(validateUsername("abc123"),true)});
test("username rejects uppercase, punctuation and short values",()=>{assert.equal(validateUsername("Allen"),false);assert.equal(validateUsername("ab"),false);assert.equal(validateUsername("a-b"),false)});
test("username blocks reserved route names",()=>{for(const name of ["admin","login","api","settings","deleted_user"])assert.equal(validateUsername(name),false)});
