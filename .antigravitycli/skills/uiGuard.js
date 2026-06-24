/**
 * ─────────────────────────────────────────────────
 *  uiGuard.js — AI Slop Detector & Component Scaffold
 * ─────────────────────────────────────────────────
 *  Sub-commands:
 *    check              Scan CWD for placeholder text, inline styles,
 *                       hardcoded colors, missing alt attributes.
 *    boilerplate <fw>   Generate mature React or Vue component template
 *                       with loading / empty / error states.
 *
 *  Usage:  const uiGuard = require('./uiGuard');
 *          uiGuard.execute('check');
 *          uiGuard.execute('boilerplate react');
 * ─────────────────────────────────────────────────
 */

'use strict';

const fs   = require('node:fs');
const path = require('node:path');
const pc   = require('picocolors');

// ── Constants ────────────────────────────────────

const TARGET_EXTENSIONS = new Set(['.html', '.js', '.jsx', '.tsx', '.vue']);

const SLOP_RULES = [
  {
    id: 'placeholder-text',
    label: 'Placeholder / Lorem Ipsum text',
    regex: /\b(lorem\s+ipsum|placeholder\s+text|sample\s+text|dummy\s+text|insert\s+text\s+here|your\s+text\s+here|click\s+here|todo:\s*add\s+text)\b/gi,
  },
  {
    id: 'inline-style',
    label: 'Inline style attribute (use CSS classes / design tokens)',
    regex: /\bstyle\s*=\s*["'{]/gi,
  },
  {
    id: 'hardcoded-hex',
    label: 'Hardcoded hex color (use design-system variable)',
    // Matches #fff, #f0f0f0, #AABBCC — ignores CSS custom-property refs
    regex: /(?<!var\(\s*)#(?:[0-9a-fA-F]{3}){1,2}\b/g,
  },
  {
    id: 'img-missing-alt',
    label: '<img> without alt attribute (a11y violation)',
    // img tag that does NOT contain alt= before closing >
    regex: /<img\b(?![^>]*\balt\s*=)[^>]*\/?>/gi,
  },
];

// ── File walker ──────────────────────────────────

function walkDir(dir, fileList = []) {
  const SKIP = new Set(['node_modules', '.git', '.next', 'dist', 'build', '.antigravitycli']);

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return fileList;
  }

  for (const entry of entries) {
    if (SKIP.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath, fileList);
    } else if (TARGET_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// ── CHECK sub-command ────────────────────────────

function runCheck() {
  const cwd   = process.cwd();
  const files  = walkDir(cwd);
  let warnings = 0;

  console.log('');
  console.log(pc.bold(pc.cyan('┌─────────────────────────────────────────┐')));
  console.log(pc.bold(pc.cyan('│  🔍  uiGuard — AI Slop Scanner          │')));
  console.log(pc.bold(pc.cyan('└─────────────────────────────────────────┘')));
  console.log(pc.dim(`   Scanning ${files.length} file(s) in ${cwd}`));
  console.log('');

  if (files.length === 0) {
    console.log(pc.yellow('   ⚠  No target files found (.html .js .jsx .tsx .vue)'));
    return;
  }

  for (const filePath of files) {
    const content  = fs.readFileSync(filePath, 'utf-8');
    const lines    = content.split('\n');
    const relative = path.relative(cwd, filePath);
    const hits     = [];

    for (const rule of SLOP_RULES) {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        rule.regex.lastIndex = 0;            // reset for /g patterns
        let match;
        while ((match = rule.regex.exec(line)) !== null) {
          hits.push({ rule, lineNum: i + 1, snippet: match[0] });
        }
      }
    }

    if (hits.length === 0) continue;

    warnings += hits.length;
    console.log(pc.bold(pc.white(`   📄 ${relative}`)));

    for (const h of hits) {
      const loc  = pc.dim(`L${String(h.lineNum).padStart(4)}`);
      const tag  = severityTag(h.rule.id);
      const msg  = pc.white(h.rule.label);
      const snip = pc.dim(` → ${truncate(h.snippet, 40)}`);
      console.log(`      ${loc}  ${tag} ${msg}${snip}`);
    }
    console.log('');
  }

  // summary
  console.log(pc.bold(pc.cyan('   ─── Summary ───────────────────────────')));
  if (warnings === 0) {
    console.log(pc.bold(pc.green('   ✅  Clean! No AI-slop detected.')));
  } else {
    console.log(pc.bold(pc.yellow(`   ⚠  ${warnings} warning(s) across ${files.length} file(s).`)));
    console.log(pc.dim('   Fix these before shipping — your users will notice.'));
  }
  console.log('');
}

function severityTag(ruleId) {
  const map = {
    'placeholder-text': pc.bgYellow(pc.black(' TXT ')),
    'inline-style':     pc.bgMagenta(pc.white(' CSS ')),
    'hardcoded-hex':    pc.bgMagenta(pc.white(' HEX ')),
    'img-missing-alt':  pc.bgRed(pc.white(' A11Y ')),
  };
  return map[ruleId] || pc.bgGray(' ??? ');
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

// ── BOILERPLATE sub-command ──────────────────────

function runBoilerplate(framework) {
  const fw = (framework || '').toLowerCase().trim();

  if (!['react', 'vue'].includes(fw)) {
    console.log('');
    console.log(pc.red(`   ✖  Unknown framework "${fw || '(none)'}".`));
    console.log(pc.dim('      Supported: react, vue'));
    console.log('');
    return;
  }

  const template = fw === 'react' ? reactTemplate() : vueTemplate();
  const ext      = fw === 'react' ? 'tsx' : 'vue';
  const fileName = `FeatureCard.${ext}`;
  const outPath  = path.join(process.cwd(), fileName);

  fs.writeFileSync(outPath, template, 'utf-8');

  console.log('');
  console.log(pc.bold(pc.cyan('┌─────────────────────────────────────────┐')));
  console.log(pc.bold(pc.cyan('│  🧩  uiGuard — Component Boilerplate    │')));
  console.log(pc.bold(pc.cyan('└─────────────────────────────────────────┘')));
  console.log(pc.green(`   ✅  Created ${pc.bold(fileName)}`));
  console.log(pc.dim(`       → ${outPath}`));
  console.log('');
  console.log(pc.dim('   Includes: loading · empty · error · success states'));
  console.log(pc.dim('   Human micro-copy, no "Lorem Ipsum" nonsense.'));
  console.log('');
}

// ── React Template ───────────────────────────────

function reactTemplate() {
  return `\
import { useState, useEffect, type ReactNode } from 'react';
import styles from './FeatureCard.module.css';

/* ─── Types ────────────────────────────────────── */

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface FeatureCardProps {
  /** API endpoint or async loader */
  fetchItems: () => Promise<FeatureItem[]>;
  /** Optional: override empty-state message */
  emptyMessage?: string;
  /** Slot for custom header */
  header?: ReactNode;
}

/* ─── State Machine ────────────────────────────── */

type ViewState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'error'; message: string; retry: () => void }
  | { status: 'success'; items: FeatureItem[] };

/* ─── Component ────────────────────────────────── */

export default function FeatureCard({
  fetchItems,
  emptyMessage = 'Nothing here yet — check back soon!',
  header,
}: FeatureCardProps) {
  const [view, setView] = useState<ViewState>({ status: 'idle' });

  const load = async () => {
    setView({ status: 'loading' });
    try {
      const items = await fetchItems();
      setView(items.length ? { status: 'success', items } : { status: 'empty' });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong on our end.';
      setView({ status: 'error', message, retry: load });
    }
  };

  useEffect(() => { load(); }, []);           // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className={styles.wrapper} aria-busy={view.status === 'loading'}>
      {header && <div className={styles.header}>{header}</div>}

      {/* ── Loading ── */}
      {view.status === 'loading' && (
        <div className={styles.state} role="status" aria-label="Loading content">
          <span className={styles.spinner} aria-hidden="true" />
          <p>Hang tight — fetching the latest…</p>
        </div>
      )}

      {/* ── Empty ── */}
      {view.status === 'empty' && (
        <div className={styles.state} role="status">
          <p className={styles.emptyIcon} aria-hidden="true">📭</p>
          <p>{emptyMessage}</p>
        </div>
      )}

      {/* ── Error ── */}
      {view.status === 'error' && (
        <div className={styles.state} role="alert">
          <p className={styles.errorIcon} aria-hidden="true">⚠️</p>
          <p>Oops — {view.message}</p>
          <button
            className={styles.retryBtn}
            onClick={view.retry}
            type="button"
          >
            Give it another shot
          </button>
        </div>
      )}

      {/* ── Success ── */}
      {view.status === 'success' && (
        <ul className={styles.grid} role="list">
          {view.items.map((item) => (
            <li key={item.id} className={styles.card}>
              <img
                src={item.imageUrl}
                alt={\`Illustration for \${item.title}\`}
                className={styles.cardImg}
                loading="lazy"
              />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
`;
}

// ── Vue Template ─────────────────────────────────

function vueTemplate() {
  return `\
<script setup lang="ts">
import { ref, onMounted } from 'vue';

/* ─── Types ────────────────────────────────────── */

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface Props {
  fetchItems: () => Promise<FeatureItem[]>;
  emptyMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  emptyMessage: 'Nothing here yet — check back soon!',
});

/* ─── State ────────────────────────────────────── */

type Status = 'idle' | 'loading' | 'empty' | 'error' | 'success';

const status   = ref<Status>('idle');
const items    = ref<FeatureItem[]>([]);
const errorMsg = ref('');

/* ─── Loader ───────────────────────────────────── */

async function load() {
  status.value = 'loading';
  try {
    const result = await props.fetchItems();
    if (result.length === 0) {
      status.value = 'empty';
    } else {
      items.value  = result;
      status.value = 'success';
    }
  } catch (err) {
    errorMsg.value = err instanceof Error ? err.message : 'Something went wrong on our end.';
    status.value   = 'error';
  }
}

onMounted(load);
</script>

<template>
  <section class="feature-card" :aria-busy="status === 'loading'">
    <!-- Header slot -->
    <div v-if="$slots.header" class="feature-card__header">
      <slot name="header" />
    </div>

    <!-- Loading -->
    <div v-if="status === 'loading'" class="feature-card__state" role="status" aria-label="Loading content">
      <span class="feature-card__spinner" aria-hidden="true" />
      <p>Hang tight — fetching the latest…</p>
    </div>

    <!-- Empty -->
    <div v-else-if="status === 'empty'" class="feature-card__state" role="status">
      <p class="feature-card__empty-icon" aria-hidden="true">📭</p>
      <p>{{ emptyMessage }}</p>
    </div>

    <!-- Error -->
    <div v-else-if="status === 'error'" class="feature-card__state" role="alert">
      <p class="feature-card__error-icon" aria-hidden="true">⚠️</p>
      <p>Oops — {{ errorMsg }}</p>
      <button class="feature-card__retry" type="button" @click="load">
        Give it another shot
      </button>
    </div>

    <!-- Success -->
    <ul v-else-if="status === 'success'" class="feature-card__grid" role="list">
      <li v-for="item in items" :key="item.id" class="feature-card__card">
        <img
          :src="item.imageUrl"
          :alt="\`Illustration for \${item.title}\`"
          class="feature-card__card-img"
          loading="lazy"
        />
        <h3 class="feature-card__card-title">{{ item.title }}</h3>
        <p class="feature-card__card-desc">{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.feature-card {
  /* Use your design-system tokens here */
  --card-radius: var(--radius-md, 12px);
  --card-gap: var(--space-md, 1.5rem);
}

.feature-card__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--card-gap);
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-card__state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  text-align: center;
}

.feature-card__spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.feature-card__retry {
  cursor: pointer;
  padding: 0.5rem 1.25rem;
  border: 1px solid currentColor;
  border-radius: var(--card-radius);
  background: transparent;
  font: inherit;
  transition: background 0.2s;
}
.feature-card__retry:hover {
  background: rgba(0, 0, 0, 0.05);
}
</style>
`;
}

// ── Public API ───────────────────────────────────

function execute(action) {
  if (!action || typeof action !== 'string') {
    printUsage();
    return;
  }

  const [cmd, ...args] = action.trim().split(/\s+/);

  switch (cmd.toLowerCase()) {
    case 'check':
      runCheck();
      break;
    case 'boilerplate':
      runBoilerplate(args[0]);
      break;
    default:
      console.log(pc.red(`\n   ✖  Unknown command: "${cmd}"\n`));
      printUsage();
  }
}

function printUsage() {
  console.log('');
  console.log(pc.bold(pc.cyan('  uiGuard — Usage')));
  console.log(pc.dim('  ─────────────────────────────────'));
  console.log(`  ${pc.green('check')}                Scan for AI-slop patterns`);
  console.log(`  ${pc.green('boilerplate')} ${pc.dim('<react|vue>')}  Generate mature component`);
  console.log('');
}

module.exports = { execute };
