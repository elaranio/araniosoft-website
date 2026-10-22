// POST /api/feedback  — guarda una respuesta de la encuesta en el KV `FEEDBACK` (binding de Cloudflare Pages).
// GET  /api/feedback  — lista las respuestas; sólo con `Authorization: Bearer <ADMIN_TOKEN>`.
//
// Requiere en el proyecto de Pages: un KV con binding `FEEDBACK` y el secreto `ADMIN_TOKEN`
// (pasos en Docs/plans/2026-10-22-encuesta-ayudanos-a-mejorar.md). Sin el binding responde 503 y la página
// ofrece el correo como alternativa: nada se rompe mientras no esté configurado.

import { validate, recordKey, dayKey, MAX_BODY, DAILY_CAP } from "../_lib/feedback.js";

const HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };
const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: HEADERS });

function randomHex(n) {
  const a = new Uint8Array(n);
  crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function onRequestPost({ request, env }) {
  if (!env.FEEDBACK) return json({ error: "storage_not_configured" }, 503);

  const text = await request.text();
  if (text.length > MAX_BODY) return json({ error: "too_large" }, 413);

  let body;
  try { body = JSON.parse(text); } catch { return json({ error: "invalid" }, 400); }

  const result = validate(body);
  if (!result.ok) {
    // Los bots reciben «ok» y no se guarda nada; las personas reciben el motivo para corregirlo.
    if (result.reason === "spam") return json({ ok: true });
    return json({ error: result.reason }, 400);
  }

  const at = new Date().toISOString();

  // Tope global diario: protege el almacén de una inundación (no identifica a nadie).
  const capKey = dayKey(at);
  const used = parseInt((await env.FEEDBACK.get(capKey)) || "0", 10);
  if (used >= DAILY_CAP) return json({ error: "busy" }, 429);
  await env.FEEDBACK.put(capKey, String(used + 1), { expirationTtl: 172800 });

  const key = recordKey(at, randomHex(3));
  await env.FEEDBACK.put(key, JSON.stringify({ id: key, at, ...result.record }));
  return json({ ok: true });
}

export async function onRequestGet({ request, env }) {
  const token = env.ADMIN_TOKEN;
  const auth = request.headers.get("authorization") || "";
  // Sin token configurado o distinto: no se revela nada.
  if (!token || auth !== `Bearer ${token}`) return json({ error: "unauthorized" }, 401);
  if (!env.FEEDBACK) return json({ error: "storage_not_configured" }, 503);

  const keys = [];
  let cursor;
  for (let page = 0; page < 5; page++) {
    const r = await env.FEEDBACK.list({ prefix: "r:", cursor, limit: 1000 });
    keys.push(...r.keys.map((k) => k.name));
    if (r.list_complete) break;
    cursor = r.cursor;
  }
  const rows = (await Promise.all(keys.map((k) => env.FEEDBACK.get(k)))).filter(Boolean).map((s) => JSON.parse(s));
  rows.sort((a, b) => (a.at < b.at ? 1 : -1));
  return json({ count: rows.length, rows });
}
