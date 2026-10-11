const assert = require("node:assert/strict");
const {readFileSync} = require("node:fs");
const path = require("node:path");
const {test} = require("node:test");
const {runInNewContext} = require("node:vm");

const load = (stored) => {
    const scope = {chrome: {storage: {sync: {get: async (keys) =>
        Object.fromEntries(keys.filter((k) => k in stored).map((k) => [k, stored[k]]))}}}};
    runInNewContext(readFileSync(path.join(__dirname, "../lib/siyuan-api.js"), "utf8"), scope);
    return scope.siyuanAuthHeaders;
};

test("only Authorization when CF Access is not configured", async () => {
    assert.deepEqual({...await load({})("tk")}, {Authorization: "Token tk"});
});

test("adds trimmed CF Access headers when both values are set", async () => {
    const headers = await load({cfAccessClientId: " id.access ", cfAccessClientSecret: " sec "})("tk");
    assert.deepEqual({...headers}, {
        Authorization: "Token tk",
        "CF-Access-Client-Id": "id.access",
        "CF-Access-Client-Secret": "sec",
    });
});

test("skips CF Access headers when only one value is set", async () => {
    for (const stored of [{cfAccessClientId: "id"}, {cfAccessClientSecret: "sec"}, {cfAccessClientId: "id", cfAccessClientSecret: "  "}]) {
        assert.deepEqual({...await load(stored)("tk")}, {Authorization: "Token tk"});
    }
});
