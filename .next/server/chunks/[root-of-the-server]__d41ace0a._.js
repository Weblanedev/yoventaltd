module.exports = [
"[project]/.next-internal/server/app/api/user/me/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/src/lib/session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SESSION_COOKIE_NAME",
    ()=>COOKIE,
    "createSessionToken",
    ()=>createSessionToken,
    "newUserId",
    ()=>newUserId,
    "parseSessionToken",
    ()=>parseSessionToken
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
;
const COOKIE = 'techvault_session';
function base64Url(buf) {
    return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
function base64UrlDecode(s) {
    const pad = 4 - s.length % 4;
    const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + (pad < 4 ? '='.repeat(pad) : '');
    return Buffer.from(b64, 'base64');
}
function createSessionToken(userId, secret, maxAgeMs = 7 * 24 * 60 * 60 * 1000) {
    const exp = Date.now() + maxAgeMs;
    const payload = base64Url(Buffer.from(JSON.stringify({
        userId,
        exp
    }), 'utf8'));
    const sig = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])('sha256', secret).update(payload).digest('base64url');
    return `${payload}.${sig}`;
}
function parseSessionToken(token, secret) {
    if (!token || !secret) return null;
    const [payload, sig] = token.split('.');
    if (!payload || !sig) return null;
    const expected = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])('sha256', secret).update(payload).digest('base64url');
    const a = Buffer.from(expected);
    const b = Buffer.from(sig);
    if (a.length !== b.length || !(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(a, b)) return null;
    try {
        const json = JSON.parse(base64UrlDecode(payload).toString('utf8'));
        if (!json.userId || !json.exp || Date.now() > json.exp) return null;
        return {
            userId: json.userId
        };
    } catch  {
        return null;
    }
}
function newUserId() {
    return base64Url((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(16));
}
;
}),
"[project]/src/lib/env.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSessionSecret",
    ()=>getSessionSecret,
    "isProductionNodeEnv",
    ()=>isProductionNodeEnv
]);
function getSessionSecret() {
    return process.env.SESSION_SECRET ?? 'dev-insecure';
}
function isProductionNodeEnv() {
    return ("TURBOPACK compile-time value", "development") === 'production';
}
}),
"[project]/src/lib/auth-session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserIdFromCookies",
    ()=>getUserIdFromCookies,
    "getUserIdOrConfigError",
    ()=>getUserIdOrConfigError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env.ts [app-route] (ecmascript)");
;
;
;
async function getUserIdFromCookies() {
    const secret = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionSecret"])();
    const c = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const token = c.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE_NAME"])?.value;
    const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseSessionToken"])(token, secret);
    return p?.userId ?? null;
}
async function getUserIdOrConfigError() {
    const secret = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionSecret"])();
    if (secret === 'dev-insecure' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isProductionNodeEnv"])()) {
        const { NextResponse } = await __turbopack_context__.A("[project]/node_modules/next/server.js [app-route] (ecmascript, async loader)");
        return {
            error: NextResponse.json({
                message: 'Server misconfiguration'
            }, {
                status: 401
            })
        };
    }
    const userId = await getUserIdFromCookies();
    if (!userId) {
        const { NextResponse } = await __turbopack_context__.A("[project]/node_modules/next/server.js [app-route] (ecmascript, async loader)");
        return {
            error: NextResponse.json({
                message: 'Unauthorized'
            }, {
                status: 401
            })
        };
    }
    return {
        userId
    };
}
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/src/lib/users-storage.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "add",
    ()=>add,
    "findByEmail",
    ()=>findByEmail,
    "findById",
    ()=>findById,
    "update",
    ()=>update
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
const FILE = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["join"])(process.cwd(), 'data', 'users.json');
const BLOB_KEY = 'user-records';
const BLOB_STORE = 'yoventa-auth';
function shouldUseNetlifyBlobs() {
    return process.env.NETLIFY === 'true' || Boolean(process.env.NETLIFY_BLOBS_READ_WRITE_TOKEN);
}
let memory = null;
let init = null;
let opChain = Promise.resolve();
function enqueue(fn) {
    const p = opChain.then(fn, fn);
    opChain = p.then(()=>undefined, ()=>undefined);
    return p;
}
async function readBlobUsers() {
    try {
        const { getStore } = await __turbopack_context__.A("[project]/node_modules/@netlify/blobs/dist/main.js [app-route] (ecmascript, async loader)");
        const store = getStore(BLOB_STORE);
        const j = await store.get(BLOB_KEY, {
            type: 'json'
        });
        return Array.isArray(j) ? j : null;
    } catch  {
        return null;
    }
}
async function readFileUsers() {
    const raw = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(FILE, 'utf8');
    return JSON.parse(raw);
}
async function loadUnlocked() {
    if (shouldUseNetlifyBlobs()) {
        const blob = await readBlobUsers();
        if (blob) {
            memory = blob;
            return;
        }
        try {
            memory = await readFileUsers();
        } catch  {
            memory = [];
        }
        return;
    }
    try {
        memory = await readFileUsers();
    } catch  {
        memory = [];
    }
}
async function ensureLoad() {
    if (memory) return;
    if (!init) {
        init = loadUnlocked();
    }
    await init;
}
async function persistUnlocked(users) {
    memory = users;
    if (shouldUseNetlifyBlobs()) {
        try {
            const { getStore } = await __turbopack_context__.A("[project]/node_modules/@netlify/blobs/dist/main.js [app-route] (ecmascript, async loader)");
            const store = getStore(BLOB_STORE);
            await store.setJSON(BLOB_KEY, users);
            return;
        } catch  {
        // Fall back to file when Blobs is not configured
        }
    }
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdir"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["join"])(process.cwd(), 'data'), {
        recursive: true
    });
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(FILE, JSON.stringify(users, null, 2), 'utf8');
}
async function findByEmail(email) {
    return enqueue(async ()=>{
        await ensureLoad();
        return memory.find((u)=>u.email.toLowerCase() === email.toLowerCase());
    });
}
async function findById(id) {
    return enqueue(async ()=>{
        await ensureLoad();
        return memory.find((u)=>u.id === id);
    });
}
async function add(user) {
    return enqueue(async ()=>{
        await ensureLoad();
        memory.push(user);
        await persistUnlocked([
            ...memory
        ]);
    });
}
async function update(id, patch) {
    return enqueue(async ()=>{
        await ensureLoad();
        const i = memory.findIndex((u)=>u.id === id);
        if (i < 0) return null;
        memory[i] = {
            ...memory[i],
            ...patch
        };
        await persistUnlocked([
            ...memory
        ]);
        return memory[i];
    });
}
}),
"[project]/src/app/api/user/me/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$users$2d$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/users-storage.ts [app-route] (ecmascript)");
;
;
;
function toPublic(u) {
    const { passwordHash, ...rest } = u;
    void passwordHash;
    return rest;
}
async function GET() {
    const userId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserIdFromCookies"])();
    if (!userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Unauthorized'
        }, {
            status: 401
        });
    }
    const u = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$users$2d$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findById"](userId);
    if (!u) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Not Found'
        }, {
            status: 404
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        user: toPublic(u)
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d41ace0a._.js.map