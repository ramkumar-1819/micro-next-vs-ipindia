/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV == "isProd";
const dev = process.env.NODE_ENV === "development";
const basePath = "/ipindia";

const nextConfig = {
  basePath,
  images: {
    domains: [
      "assets.vakilsearch.com",
      "vakilsearch.com",
      "qe.vakilsearch.com",
    ],
    formats: ["image/webp"],
    png: {
      unoptimized: true,
    },
    jpg: {
      unoptimized: true,
    },
  },
  env: {
    ASSETS_PATH: "https://assets.vakilsearch.com",
    NEXT_API_BASE_PATH: `${basePath}/api`,
    ENVURLS: isProd ? "https://vakilsearch.com" : "https://qe.vakilsearch.com",
    ZOLVIT_BASE_URL: isProd ? "https://zolvit.com" : "https://qe.zolvit.com",
    DOMAIN: isProd ? "vakilsearch.com" : "qe.vakilsearch.com",
    API_URL: isProd
      ? "https://helpdesk.vakilsearch.com"
      : "https://qe-helpdesk.vakilsearch.com",
    SITE_BASE_URL: isProd
      ? "https://vakilsearch.com"
      : "https://qe.vakilsearch.com",
    GTM_ID: isProd ? "GTM-MMRJ8B" : "GTM-MFBTMKG",
    GRC_REDIRECTION_URL: isProd
      ? "https://grc.vakilsearch.com"
      : "https://qe-grc.vakilsearch.com",
    MIXPANEL_TOKEN: isProd
      ? "ac10933f9b2acb3dd6bcf6484c96dd89"
      : "d03efce9b3b7bbfd975aaaefea7493d5",
    VSAPI_URL: isProd
      ? "https://prod-api.vakilsearch.com"
      : "https://qe-vsapi.vakilsearch.com",
    HEADER: {
      "X-Requested-With": "XMLHttpRequest",
      key: "e7e7a52397d57a5cd126328db7793009",
      token: "tPiz9vb0vGxATzEEsNciEsPf9GRNcNp6",
      "Content-Type": "application/json",
    },
    GENERIC_CHAT_BOT_ID: isProd ? "vakilsearch-g0fsx" : "vakilsearch-jmtih",
    KOMMUNICATE_APP_ID: isProd
      ? "3b1a32492c21a8a65b8378604c157474c"
      : "7c90be7e6d6d382a795bdf96fad66599",
  },
  experimental: {
    ssr: true,
    ssg: true,
  },
};

module.exports = nextConfig;
