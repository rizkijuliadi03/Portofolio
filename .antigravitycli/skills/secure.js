/**
 * ─────────────────────────────────────────────────
 *  secure.js — Hardcoded Secret Scanner & Dep Auditor
 * ─────────────────────────────────────────────────
 *  Sub-commands:
 *    scan    Recursively scan project files for leaked
 *            secrets (AWS keys, API tokens, passwords).
 *    audit   Run `npm audit` and display a clean,
 *            filtered vulnerability summary.
 *
 *  Usage:  const secure = require('./secure');
 *          await secure.execute('scan');
 *          await secure.execute('audit');
 * ─────────────────────────────────────────────────
 */

'use strict';

const fs   = require('node:fs');
const path = require('node:path');
const { exec } = require('node:child_process');
const pc   = require('picocolors');

// ── Constants ────────────────────────────────────

const TARGET_EXTENSIONS = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.vue', '.html',
  '.json', '.env', '.yml', '.yaml', '.toml',
  '.py', '.rb', '.go', '.java', '.php',
  '.sh', '.bash', '.cfg', '.ini', '.conf',
]);

const SKIP_DIRS = new Set([
  'node_modules', '.git', '.next', 'dist', 'build',
  '.antigravitycli', 'vendor', '__pycache__', '.cache',
  'coverage', '.turbo',
]);

/** Filename patterns that are always scanned regardless of extension */
const ALWAYS_SCAN = new Set([
  '.env', '.env.local', '.env.development', '.env.production',
  '.env.staging', '.env.test',
]);

// ── Secret Detection Rules ──────────────────────

const SECRET_RULES = [
  {
    id: 'aws-access-key',
    label: 'AWS Access Key ID',
    severity: 'CRITICAL',
    regex: /(?:^|[^A-Z0-9])(?:AKIA|ABIA|ACCA|ASIA)[A-Z0-9]{16}(?:[^A-Z0-9]|$)/g,
  },
  {
    id: 'aws-secret-key',
    label: 'AWS Secret Access Key',
    severity: 'CRITICAL',
    regex: /(?:aws_secret_access_key|aws_secret)\s*[=:]\s*["']?[A-Za-z0-9/+=]{40}["']?/gi,
  },
  {
    id: 'generic-api-key',
    label: 'Hardcoded API Key / Token assignment',
    severity: 'HIGH',
    regex: /(?:api[_-]?key|api[_-]?secret|access[_-]?token|auth[_-]?token|client[_-]?secret)\s*[=:]\s*["'][A-Za-z0-9_\-/.+=]{8,}["']/gi,
  },
  {
    id: 'jwt-secret',
    label: 'JWT / Session Secret',
    severity: 'HIGH',
    regex: /(?:jwt[_-]?secret|session[_-]?secret|secret[_-]?key|encryption[_-]?key)\s*[=:]\s*["'][^"']{8,}["']/gi,
  },
  {
    id: 'password-assignment',
    label: 'Hardcoded Password',
    severity: 'HIGH',
    regex: /(?:password|passwd|pwd|db_pass)\s*[=:]\s*["'][^"']{4,}["']/gi,
  },
  {
    id: 'private-key-block',
    label: 'Private Key (PEM block)',
    severity: 'CRITICAL',
    regex: /-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/g,
  },
  {
    id: 'github-token',
    label: 'GitHub Personal Access Token',
    severity: 'CRITICAL',
    regex: /gh[pousr]_[A-Za-z0-9_]{36,}/g,
  },
  {
    id: 'generic-bearer',
    label: 'Hardcoded Bearer Token',
    severity: 'HIGH',
    regex: /["']Bearer\s+[A-Za-z0-9\-._~+/]+=*["']/g,
  },
  {
    id: 'connection-string',
    label: 'Database Connection String with credentials',
    severity: 'CRITICAL',
    regex: /(?:mongodb|postgres|mysql|redis|amqp):\/\/[^:]+:[^@]+@[^\s"']+/gi,
  },
];

// ── Severity styling ─────────────────────────────

function severityBadge(level) {
  const map = {
    CRITICAL: pc.bgRed(pc.white(pc.bold(' CRITICAL '))),
    HIGH:     pc.bgYellow(pc.black(pc.bold('   HIGH   '))),
    MEDIUM:   pc.bgMagenta(pc.white(pc.bold('  MEDIUM  '))),
    LOW:      pc.bgCyan(pc.black(pc.bold('   LOW    '))),
  };
  return map[level] || pc.bgGray(pc.white(` ${level} `));
}

// ── File walker (async) ──────────────────────────

async function walkDir(dir, fileList = []) {
  let entries;
  try {
    entries = await fs.promises.readdir(dir, { withFileTypes: true });
  } catch {
    return fileList;
  }

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walkDir(fullPath, fileList);
    } else {
      const ext  = path.extname(entry.name).toLowerCase();
      const base = entry.name.toLowerCase();
      if (TARGET_EXTENSIONS.has(ext) || ALWAYS_SCAN.has(base)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

// ── Helpers ──────────────────────────────────────

function truncate(str, max = 60) {
  const clean = str.replace(/\n/g, '\\n').trim();
  return clean.length > max ? clean.slice(0, max - 1) + '…' : clean;
}

function redact(snippet) {
  // Attempt to mask the actual secret value while keeping context
  return snippet.replace(
    /(["'])[A-Za-z0-9/+=\-._~]{8,}\1/g,
    (m) => m[0] + '*'.repeat(Math.min(m.length - 2, 20)) + m[m.length - 1]
  );
}

// ── SCAN sub-command ─────────────────────────────

async function runScan() {
  const cwd   = process.cwd();
  const files  = await walkDir(cwd);
  let findings = 0;
  const summary = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };

  console.log('');
  console.log(pc.bold(pc.red('┌─────────────────────────────────────────┐')));
  console.log(pc.bold(pc.red('│  🔒  secure — Secret Scanner             │')));
  console.log(pc.bold(pc.red('└─────────────────────────────────────────┘')));
  console.log(pc.dim(`   Scanning ${files.length} file(s) in ${cwd}`));
  console.log('');

  if (files.length === 0) {
    console.log(pc.yellow('   ⚠  No target files found.'));
    return;
  }

  for (const filePath of files) {
    let content;
    try {
      content = await fs.promises.readFile(filePath, 'utf-8');
    } catch {
      continue; // skip unreadable files
    }

    const lines    = content.split('\n');
    const relative = path.relative(cwd, filePath);
    const hits     = [];

    for (const rule of SECRET_RULES) {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        rule.regex.lastIndex = 0;
        let match;
        while ((match = rule.regex.exec(line)) !== null) {
          hits.push({
            rule,
            lineNum: i + 1,
            snippet: match[0],
          });
        }
      }
    }

    if (hits.length === 0) continue;

    findings += hits.length;
    console.log(pc.bold(pc.white(`   📄 ${relative}`)));

    for (const h of hits) {
      summary[h.rule.severity] = (summary[h.rule.severity] || 0) + 1;
      const loc  = pc.dim(`L${String(h.lineNum).padStart(4)}`);
      const badge = severityBadge(h.rule.severity);
      const label = pc.white(h.rule.label);
      const snip  = pc.dim(` → ${redact(truncate(h.snippet))}`);
      console.log(`      ${loc}  ${badge} ${label}${snip}`);
    }
    console.log('');
  }

  // ── Summary ──
  console.log(pc.bold(pc.red('   ─── Summary ───────────────────────────')));

  if (findings === 0) {
    console.log(pc.bold(pc.green('   ✅  Clean! No hardcoded secrets detected.')));
  } else {
    console.log(pc.bold(pc.red(`   🚨  ${findings} potential secret(s) found!\n`)));

    const table = [
      ['CRITICAL', summary.CRITICAL],
      ['HIGH',     summary.HIGH],
      ['MEDIUM',   summary.MEDIUM],
      ['LOW',      summary.LOW],
    ].filter(([, count]) => count > 0);

    for (const [level, count] of table) {
      console.log(`      ${severityBadge(level)}  ${pc.bold(String(count))}`);
    }

    console.log('');
    console.log(pc.bold(pc.yellow('   💡 Recommendations:')));
    console.log(pc.dim('      1. Move all secrets to .env files'));
    console.log(pc.dim('      2. Add .env to .gitignore'));
    console.log(pc.dim('      3. Use process.env.VAR_NAME in code'));
    console.log(pc.dim('      4. Rotate any exposed credentials immediately'));
  }
  console.log('');
}

// ── AUDIT sub-command ────────────────────────────

async function runAudit() {
  console.log('');
  console.log(pc.bold(pc.blue('┌─────────────────────────────────────────┐')));
  console.log(pc.bold(pc.blue('│  🛡️   secure — Dependency Audit          │')));
  console.log(pc.bold(pc.blue('└─────────────────────────────────────────┘')));

  // Verify package.json exists
  const cwd = process.cwd();
  const pkgPath = findPackageJson(cwd);

  if (!pkgPath) {
    console.log(pc.red('   ✖  No package.json found. Run from a Node.js project root.'));
    console.log('');
    return;
  }

  const pkgDir = path.dirname(pkgPath);
  console.log(pc.dim(`   Running npm audit in ${path.relative(cwd, pkgDir) || '.'}`));
  console.log(pc.dim('   This may take a moment…'));
  console.log('');

  try {
    const raw = await execAsync('npm audit --json', { cwd: pkgDir });
    displayAuditResults(raw);
  } catch (err) {
    // npm audit exits with code > 0 when vulnerabilities exist
    if (err.stdout) {
      displayAuditResults(err.stdout);
    } else {
      console.log(pc.red(`   ✖  npm audit failed: ${err.message}`));
      console.log('');
    }
  }
}

function findPackageJson(startDir) {
  let dir = startDir;
  while (true) {
    const candidate = path.join(dir, 'package.json');
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) return null; // reached root
    dir = parent;
  }
}

function execAsync(cmd, opts = {}) {
  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 10 * 1024 * 1024, ...opts }, (err, stdout, stderr) => {
      if (err) {
        err.stdout = stdout;
        err.stderr = stderr;
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}

function displayAuditResults(raw) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.log(pc.yellow('   ⚠  Could not parse npm audit output.'));
    console.log(pc.dim('   Raw output (truncated):'));
    console.log(pc.dim(`   ${raw.slice(0, 500)}`));
    console.log('');
    return;
  }

  // npm audit --json v2+ format
  const meta = data.metadata || {};
  const vulnObj = meta.vulnerabilities || {};
  const totalDeps = typeof meta.totalDependencies === 'number'
    ? meta.totalDependencies
    : typeof meta.dependencies === 'number'
      ? meta.dependencies
      : meta.dependencies?.total ?? '?';

  const levels = ['critical', 'high', 'moderate', 'low', 'info'];
  const counts = {};
  let totalVulns = 0;

  for (const lvl of levels) {
    counts[lvl] = vulnObj[lvl] || 0;
    totalVulns += counts[lvl];
  }

  // ── Display ──
  console.log(pc.bold(pc.blue('   ─── Audit Results ─────────────────────')));
  console.log(pc.dim(`   Scanned ${totalDeps} dependencies\n`));

  if (totalVulns === 0) {
    console.log(pc.bold(pc.green('   ✅  No known vulnerabilities found!')));
    console.log('');
    return;
  }

  console.log(pc.bold(pc.red(`   🚨  ${totalVulns} vulnerability/ies found\n`)));

  const rows = [
    { key: 'critical', badge: severityBadge('CRITICAL') },
    { key: 'high',     badge: severityBadge('HIGH') },
    { key: 'moderate', badge: severityBadge('MEDIUM') },
    { key: 'low',      badge: severityBadge('LOW') },
  ];

  for (const row of rows) {
    const count = counts[row.key];
    if (count === 0) continue;
    console.log(`      ${row.badge}  ${pc.bold(String(count))}`);
  }

  // ── Top Advisories ──
  const advisories = data.vulnerabilities || data.advisories || {};
  const advList = Object.values(advisories);

  if (advList.length > 0) {
    console.log('');
    console.log(pc.bold(pc.white('   ─── Top Issues ────────────────────────')));
    console.log('');

    // Sort: critical first
    const severityOrder = { critical: 0, high: 1, moderate: 2, low: 3, info: 4 };
    const sorted = advList
      .sort((a, b) => (severityOrder[a.severity] || 4) - (severityOrder[b.severity] || 4))
      .slice(0, 10);

    for (const adv of sorted) {
      const name = adv.name || adv.module_name || '?';
      const sev  = (adv.severity || 'unknown').toUpperCase();
      const title = adv.title || adv.overview || '';
      const fix   = adv.fixAvailable;

      const badge = severityBadge(sev === 'MODERATE' ? 'MEDIUM' : sev);
      const fixTag = fix
        ? pc.green(' [fix available]')
        : pc.dim(' [no fix yet]');

      console.log(`      ${badge} ${pc.bold(name)}${fixTag}`);
      if (title) console.log(pc.dim(`             ${truncate(title, 70)}`));

      // Show via chain if available
      if (adv.via && Array.isArray(adv.via)) {
        const viaNames = adv.via
          .map(v => typeof v === 'string' ? v : v.name || v.title || '')
          .filter(Boolean)
          .slice(0, 3);
        if (viaNames.length > 0) {
          console.log(pc.dim(`             via: ${viaNames.join(' → ')}`));
        }
      }
      console.log('');
    }
  }

  // ── Recommendations ──
  console.log(pc.bold(pc.yellow('   💡 Quick Fix:')));
  console.log(pc.dim('      Run: npm audit fix'));
  if (counts.critical > 0 || counts.high > 0) {
    console.log(pc.dim('      Or:  npm audit fix --force  (may include breaking changes)'));
  }
  console.log('');
}

// ── Public API ───────────────────────────────────

async function execute(action) {
  if (!action || typeof action !== 'string') {
    printUsage();
    return;
  }

  const [cmd] = action.trim().split(/\s+/);

  switch (cmd.toLowerCase()) {
    case 'scan':
      await runScan();
      break;
    case 'audit':
      await runAudit();
      break;
    default:
      console.log(pc.red(`\n   ✖  Unknown command: "${cmd}"\n`));
      printUsage();
  }
}

function printUsage() {
  console.log('');
  console.log(pc.bold(pc.red('  secure — Usage')));
  console.log(pc.dim('  ─────────────────────────────────'));
  console.log(`  ${pc.green('scan')}     Detect hardcoded secrets in project files`);
  console.log(`  ${pc.green('audit')}    Run npm dependency vulnerability audit`);
  console.log('');
}

module.exports = { execute };
