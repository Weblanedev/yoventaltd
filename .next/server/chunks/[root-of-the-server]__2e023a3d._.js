module.exports = [
"[project]/.next-internal/server/app/api/bestbuy/products/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/src/lib/categories.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRODUCT_CATEGORIES",
    ()=>PRODUCT_CATEGORIES,
    "allowedDummyjsonCategorySet",
    ()=>allowedDummyjsonCategorySet,
    "getCategoryBySlug",
    ()=>getCategoryBySlug,
    "isProductCategorySlug",
    ()=>isProductCategorySlug
]);
const PRODUCT_CATEGORIES = [
    {
        slug: 'laptops',
        label: 'Laptops',
        description: 'Notebooks and laptops for work, study, and everyday use.',
        dummyjsonCategorySlug: 'laptops'
    },
    {
        slug: 'laptop-accessories',
        label: 'Laptop accessories',
        description: 'Cases, chargers, hubs, and add-ons for your laptop.',
        dummyjsonCategorySlug: 'mobile-accessories'
    }
];
const bySlug = {};
for (const c of PRODUCT_CATEGORIES){
    bySlug[c.slug] = c;
}
function getCategoryBySlug(slug) {
    return bySlug[slug];
}
function isProductCategorySlug(s) {
    return s in bySlug;
}
function allowedDummyjsonCategorySet() {
    return new Set(PRODUCT_CATEGORIES.map((c)=>c.dummyjsonCategorySlug));
}
}),
"[project]/src/lib/pricing.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatUsd",
    ()=>formatUsd,
    "getUnitPrice",
    ()=>getUnitPrice
]);
function getUnitPrice(product) {
    const d = product.discountPercentage ?? 0;
    return product.price * (1 - d / 100);
}
function formatUsd(n) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(n);
}
}),
"[project]/src/lib/dummyjson.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchDummyJsonProducts",
    ()=>fetchDummyJsonProducts,
    "fetchSingleProduct",
    ()=>fetchSingleProduct,
    "fetchTopFromCategory",
    ()=>fetchTopFromCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$categories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/categories.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pricing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pricing.ts [app-route] (ecmascript)");
;
;
const BASE = 'https://dummyjson.com';
function mapDummy(p) {
    const unit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pricing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUnitPrice"])({
        price: p.price,
        discountPercentage: p.discountPercentage
    });
    return {
        sku: String(p.id),
        name: p.title,
        regularPrice: p.price,
        salePrice: unit,
        image: p.thumbnail || p.images?.[0] || '',
        description: p.description ?? '',
        categoryPath: [
            p.brand,
            p.category
        ].filter(Boolean),
        brand: p.brand ?? '',
        inStock: (p.stock ?? 0) > 0,
        stock: p.stock ?? 0,
        reviewScore: p.rating,
        reviewCount: 0,
        raw: p
    };
}
async function getJson(url, next) {
    const r = await fetch(url, next ? {
        next
    } : undefined);
    if (!r.ok) throw new Error(`DummyJSON request failed: ${r.status}`);
    return r.json();
}
async function fetchSingleProduct(sku) {
    const id = Number(sku);
    if (Number.isNaN(id)) return null;
    try {
        const p = await getJson(`${BASE}/products/${id}`);
        if (!p?.id) return null;
        return mapDummy(p);
    } catch  {
        return null;
    }
}
async function fetchDummyJsonProducts(options) {
    const { page, pageSize } = options;
    const pageSizeSafe = Math.min(100, Math.max(1, pageSize));
    const pageIndex = Math.max(1, page);
    const skip = (pageIndex - 1) * pageSizeSafe;
    const allow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$categories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["allowedDummyjsonCategorySet"])();
    if (options.q && options.q.trim()) {
        const q = encodeURIComponent(options.q.trim());
        const data = await getJson(`${BASE}/products/search?q=${q}&limit=${pageSizeSafe}&skip=${skip}`);
        const items = (data.products || []).filter((p)=>allow.has(p.category)).map(mapDummy);
        const total = data.total;
        return paginateInfo(items, pageIndex, pageSizeSafe, total);
    }
    if (options.category && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$categories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isProductCategorySlug"])(options.category)) {
        const cat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$categories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCategoryBySlug"])(options.category);
        if (!cat) {
            return emptyPage(pageIndex, pageSizeSafe);
        }
        const data = await getJson(`${BASE}/products/category/${encodeURIComponent(cat.dummyjsonCategorySlug)}?limit=${pageSizeSafe}&skip=${skip}`);
        const items = (data.products || []).map(mapDummy);
        const total = data.total;
        return paginateInfo(items, pageIndex, pageSizeSafe, total);
    }
    const dummies = [
        ...allow
    ];
    const all = [];
    for (const cat of dummies){
        try {
            const part = await getJson(`${BASE}/products/category/${encodeURIComponent(cat)}?limit=100&skip=0`);
            for (const p of part.products || []){
                if (allow.has(p.category)) all.push(p);
            }
        } catch  {
        // Skip a category that failed to load
        }
    }
    const seen = new Set();
    const unique = [];
    for (const p of all){
        if (!seen.has(p.id)) {
            seen.add(p.id);
            unique.push(p);
        }
    }
    unique.sort((a, b)=>a.id - b.id);
    const total = unique.length;
    const slice = unique.slice(skip, skip + pageSizeSafe);
    const items = slice.map(mapDummy);
    return paginateInfo(items, pageIndex, pageSizeSafe, total);
}
function emptyPage(page, pageSize) {
    return {
        items: [],
        page,
        pageSize,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: page > 1
    };
}
function paginateInfo(items, page, pageSize, total) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    return {
        items,
        page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1
    };
}
async function fetchTopFromCategory(dummyjsonCategory, take, options) {
    const data = await getJson(`${BASE}/products/category/${encodeURIComponent(dummyjsonCategory)}?limit=${take}&skip=0`, options?.revalidate != null ? {
        revalidate: options.revalidate
    } : undefined);
    return (data.products || []).map(mapDummy);
}
}),
"[project]/src/app/api/bestbuy/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$categories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/categories.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummyjson$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dummyjson.ts [app-route] (ecmascript)");
;
;
;
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get('page') || 1) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get('pageSize') || 12) || 12));
    const q = searchParams.get('q') || undefined;
    const category = searchParams.get('category') || undefined;
    if (category && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$categories$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isProductCategorySlug"])(category)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Invalid category',
            error: 'Bad Request'
        }, {
            status: 400
        });
    }
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dummyjson$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchDummyJsonProducts"])({
        page,
        pageSize,
        q,
        category
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2e023a3d._.js.map