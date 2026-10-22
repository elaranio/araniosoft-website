// Validación de la encuesta «Ayúdanos a mejorar» (22-oct-2026).
//
// Privacidad: sólo se guarda lo que la persona escribe o elige. No se guarda IP, navegador, cookies ni nada
// que la identifique; el correo es opcional y sólo sirve para invitarle a una charla.
// Las respuestas cerradas se guardan como CLAVES (idioma-independientes), no como el texto mostrado.

export const FREQ = ["daily", "weekly_few", "weekly_one", "sometimes", "rarely"];
export const GOAL = ["spending", "budget", "cards", "split", "saving", "other"];
export const USE = ["log", "budget", "heatmap", "cards", "split", "shopping", "goals", "analytics", "import", "other"];
export const PRO = ["already_pro", "price", "not_needed", "unclear", "prefer_free", "other"];
export const LANGS = ["es", "pt", "en"];

export const MAX_BODY = 12000;       // caracteres de todo el cuerpo
export const MAX_TEXT = 1500;        // respuestas libres
export const MAX_SHORT = 200;        // «otro» y correo
export const MIN_ELAPSED_MS = 2500;  // menos que esto, no es una persona leyendo
export const DAILY_CAP = 300;        // tope global de respuestas por día (protege el almacén)

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Quita caracteres de control (salvo salto de línea y tabulador) y recorta.
function clean(v, max) {
  if (typeof v !== "string") return "";
  return v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

function oneOf(v, list) {
  return typeof v === "string" && list.includes(v) ? v : null;
}

/**
 * Devuelve { ok: true, record } con lo que se guarda, o { ok: false, reason }.
 * reason "spam" = se descarta en silencio (el cliente ve éxito para no enseñarle al bot qué falló).
 */
export function validate(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false, reason: "invalid" };

  // Trampas de bots: campo oculto relleno o envío demasiado rápido.
  if (clean(body.website, 50) !== "") return { ok: false, reason: "spam" };
  if (!(Number(body.elapsed) >= MIN_ELAPSED_MS)) return { ok: false, reason: "spam" };

  const q1 = oneOf(body.q1, FREQ);
  if (!q1) return { ok: false, reason: "q1_required" };

  const lang = oneOf(body.lang, LANGS) || "en";
  const q2 = oneOf(body.q2, GOAL);
  const q6 = oneOf(body.q6, PRO);

  let q3 = Array.isArray(body.q3) ? body.q3.map((x) => oneOf(x, USE)).filter(Boolean) : [];
  q3 = [...new Set(q3)].slice(0, 3);

  let q7 = null;
  if (body.q7 !== null && body.q7 !== undefined && body.q7 !== "") {
    const n = Number(body.q7);
    if (Number.isInteger(n) && n >= 0 && n <= 10) q7 = n;
  }

  let q8 = clean(body.q8, MAX_SHORT);
  if (q8 && !EMAIL.test(q8)) return { ok: false, reason: "email_invalid" };

  return {
    ok: true,
    record: {
      lang,
      q1,
      q2,
      q2Other: q2 === "other" ? clean(body.q2Other, MAX_SHORT) : "",
      q3,
      q3Other: q3.includes("other") ? clean(body.q3Other, MAX_SHORT) : "",
      q4: clean(body.q4, MAX_TEXT),
      q5: clean(body.q5, MAX_TEXT),
      q6,
      q6Other: q6 === "other" ? clean(body.q6Other, MAX_SHORT) : "",
      q7,
      q8,
    },
  };
}

// Clave del almacén: ordenable por fecha y sin colisiones.
export function recordKey(at, rand) {
  return `r:${at}:${rand}`;
}

export function dayKey(at) {
  return `cap:${at.slice(0, 10)}`;
}
