import React, { useState } from 'react';
import { 
  X, 
  Github, 
  Code, 
  Copy, 
  Check, 
  Terminal, 
  BookOpen, 
  FileText, 
  FolderTree, 
  AlertCircle,
  Lightbulb
} from 'lucide-react';

interface GitHubPagesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesGuideModal: React.FC<GitHubPagesGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const viteConfigSnippet = `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    // PENTING: base './' wajib ditambahkan agar asset gambar dan JS
    // terbaca dengan benar saat di-deploy ke GitHub Pages sub-path (https://username.github.io/repo-name/)
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});`;

  const githubActionWorkflow = `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border-2 border-cyan-500/40 rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 my-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
              Dokumentasi Penerapan & Repositori
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Panduan Pembaruan Kode & Deploy ke GitHub Pages
            </h2>
            <p className="text-xs text-slate-400">
              Langkah lengkap menerapkan perbaikan perhitungan nilai pada repositori Anda
            </p>
          </div>
        </div>

        {/* Section A: Penjelasan Temuan Poin 170 vs 200 */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Hasil Pemeriksaan Kode Sumber: Misteri 170 Poin vs 200 Poin</span>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              Berdasarkan analisis struktur tantangan Ruang Investigasi:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>
                Aplikasi memiliki <strong>5 Berkas Kasus Resmi</strong> (Kasus 1 s.d Kasus 5), masing-masing berbobot <strong>40 poin</strong> (4 pertanyaan × 10 poin per soal).
              </li>
              <li>
                <strong>Total Poin Maksimal Penuh = 200 Poin</strong> (5 × 40 = 200).
              </li>
              <li>
                <strong>Mengapa angka 170 muncul?</strong> Jika peserta didik mengerjakan 4 kasus pertama (160 poin) ditambah 1 soal/bonus (10 poin) = 170 poin. Jika penyebut acuan yang digunakan adalah 200, maka nilainya adalah:
                <code className="text-amber-300 font-mono font-bold mx-1">
                  (170 ÷ 200) × 100 = 85 (Tercapai)
                </code>
                (Bukan 100!).
              </li>
              <li>
                Namun, jika guru menghendaki acuan kurikulum yang hanya menilai 170 poin, sistem telah dilengkapi dengan <strong>sakelar toggle acuan</strong> (200 poin vs 170 poin) di halaman Rekap Nilai Guru dan Simulator!
              </li>
            </ul>
          </div>
        </div>

        {/* Section B: File yang diubah */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <FolderTree className="w-4 h-4" />
            <span>Daftar File yang Diubah & Ditambahkan</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-emerald-400">src/utils/scoreCalculator.ts</strong>
              <p className="text-slate-400 text-[11px] mt-0.5">Rumus resmi perhitungan nilai (0–100), clamp min-max, evaluasi KKTP 75, dan skenario validasi.</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-emerald-400">src/components/ScoreResultCard.tsx</strong>
              <p className="text-slate-400 text-[11px] mt-0.5">Komponen kartu rapor otomatis (Nama, Poin, Max Poin, Nilai 0–100, KKTP 75, Status, Cetak).</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-emerald-400">src/components/RuangInvestigasi.tsx</strong>
              <p className="text-slate-400 text-[11px] mt-0.5">Perbaikan pencatatan akumulasi skor per kasus dan integrasi rapor nilai otomatis.</p>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              <strong className="text-emerald-400">src/components/GaleriDanRekap.tsx</strong>
              <p className="text-slate-400 text-[11px] mt-0.5">Buku rekap nilai guru dengan ekspor CSV, filter KKTP, dan penyimpanan permanen.</p>
            </div>
          </div>
        </div>

        {/* Section C: Langkah GitHub Pages */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Langkah Menerapkan ke Repositori GitHub Pages</span>
          </h3>

          {/* Step 1 */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">
                Langkah 1: Perbarui vite.config.ts (Tambahkan base: './')
              </span>
              <button
                onClick={() => copyToClipboard(viteConfigSnippet, 'vite')}
                className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
              >
                {copiedKey === 'vite' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'vite' ? 'Disalin!' : 'Salin Kode'}</span>
              </button>
            </div>
            <pre className="bg-slate-900 p-3 rounded-lg text-[11px] font-mono text-cyan-300 overflow-x-auto border border-slate-800">
              {viteConfigSnippet}
            </pre>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">
                Langkah 2: Tambahkan GitHub Actions Workflow (.github/workflows/deploy.yml)
              </span>
              <button
                onClick={() => copyToClipboard(githubActionWorkflow, 'gh-workflow')}
                className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
              >
                {copiedKey === 'gh-workflow' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'gh-workflow' ? 'Disalin!' : 'Salin Kode'}</span>
              </button>
            </div>
            <pre className="bg-slate-900 p-3 rounded-lg text-[11px] font-mono text-emerald-300 overflow-x-auto border border-slate-800 max-h-52">
              {githubActionWorkflow}
            </pre>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
            <span className="text-xs font-bold text-amber-400 block">
              Langkah 3: Aktifkan GitHub Pages di Repository
            </span>
            <ol className="list-decimal pl-5 text-xs text-slate-300 space-y-1 leading-relaxed">
              <li>Buka repositori Anda di GitHub.</li>
              <li>Klik tab <strong>Settings</strong> &gt; menu sebelah kiri <strong>Pages</strong>.</li>
              <li>Pada bagian <strong>Build and deployment &gt; Source</strong>, pilih <strong>GitHub Actions</strong>.</li>
              <li>Commit dan push perubahan ini ke branch <code>main</code>. Website akan otomatis live dalam hitungan detik!</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
};
