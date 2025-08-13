import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import html from "@rollup/plugin-html";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import image from "@rollup/plugin-image";
import { terser } from "rollup-plugin-terser";
import cssnano from "cssnano";
import purgecss from "@fullhuman/postcss-purgecss";
import { readFileSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import copy from "rollup-plugin-copy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = "dist";
const PURGE_CSS_CONFIG = {
  content: ["./app/**/*.html", "./app/**/*.js"],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
};

const isDevelopment = process.env.ROLLUP_WATCH;
const isProduction = !process.env.ROLLUP_WATCH;

export default {
  input: "app/index.js",
  output: {
    dir: OUTPUT_DIR,
    format: "es",
    sourcemap: true,
    entryFileNames: "assets/[name]-[hash].js",
    chunkFileNames: "assets/[name]-[hash].js",
    assetFileNames: "assets/[name]-[hash][extname]",
  },
  plugins: [
    image(),
    postcss({
      include: "app/styles/*.css",
      extract: true,
    }),
    postcss({
      include: "**/index.css",
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
    html({
      template: ({ files }) => {
        const template = readFileSync(
          path.resolve(__dirname, "app/template.html"),
          "utf8"
        );

        const cssTags = (files.css || [])
          .map(({ fileName }) => `<link href="${fileName}" rel="stylesheet">`)
          .join("\n");

        const jsTags = (files.js || [])
          .map(
            ({ fileName }) =>
              `<script src="${fileName}" type="module"></script>`
          )
          .join("\n");

        return template.replace("", cssTags).replace("", jsTags);
      },
    }),
    copy({
      targets: [{ src: "public/*", dest: "dist" }],
    }),
    isDevelopment &&
      serve({
        contentBase: [OUTPUT_DIR, "."],
        historyApiFallback: true,
        port: 8080,
      }),
    isDevelopment && livereload(OUTPUT_DIR),
    isProduction && purgecss.default(PURGE_CSS_CONFIG),
    isProduction &&
      cssnano({
        // Só ativa em produção
        preset: "default",
      }),
    isProduction && terser(),
  ],
  external: ["vertx"],
};
