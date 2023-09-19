const fs = require("fs");
const path = require("path");
const async_loop = require("async");
const directoryPath = path.join(__dirname, ".next/server/pages");
const format = require("date-fns/format");
const { exec } = require("child_process");
// const services = require('./bridge/data/services.json');
// const modifiedUrls = require('./bridge/data/modified-urls.json');
// const exclusiveservices = require('./bridge/data/new-structure-1.json');
const isProd = process.env.NODE_ENV == "isProd";
const awsCDN = process.env.NODE_ENV == "awsCDN";

const checkFolders = (folder) => {
  const forbiddenNames = ["api", "cart"];
  let check = true;
  forbiddenNames.forEach((forbiddenName) => {
    if (forbiddenName === folder.name) {
      return (check = false);
    }
  });
  return check;
};

const checkFile = (file) => {
  const forbiddenTypes = ["json", "js", "css"];
  const fileName = file.name.split(".");
  const fileType = fileName[fileName.length - 1];
  let check = true;
  forbiddenTypes.forEach((forbiddenType) => {
    if (forbiddenType === fileType) {
      return (check = false);
    }
  });
  return check;
};

const sitemap = async ({
  baseUrl,
  pagesDirectory,
  targetDirectory,
  pagesConfig,
  useFileUpdateDate,
}) => {
  let pages = Object.keys(pagesConfig);
  pages = pages.filter((page) => !["/*", "/**/*"].includes(page));
  const siteMapObj = {};
  pages.forEach((page) => {
    console.log("pages", page);
    if (!siteMapObj[page]) {
      const date =
        page === "index.html"
          ? new Date()
          : fs.statSync(`${pagesDirectory}/${page}`).mtime;
      const lastModDate = format(date, "yyyy-MM-dd");
      siteMapObj[page] = Object.assign(
        {
          loc: page === "index.html" ? `${baseUrl}` : `${baseUrl}/${page}`,
          lastmod: useFileUpdateDate
            ? lastModDate
            : format(new Date(), "yyyy-MM-dd"),
          changefreq: "never",
          priority: 1,
        },
        pagesConfig[page]
      );
    }
  });
  const files = fs.readdirSync(pagesDirectory, { withFileTypes: true });
  files.forEach(async (file) => {
    if (!file.isDirectory()) {
      if (checkFile(file)) {
        if (!siteMapObj[file.name]) {
          const date = fs.statSync(`${pagesDirectory}/${file.name}`).mtime;
          const lastModDate = format(date, "yyyy-MM-dd");
          siteMapObj[file.name] = {
            loc: `${baseUrl}/${file.name}`,
            fileurl: file.name.replace(".html", ""),
            lastmod: useFileUpdateDate
              ? lastModDate
              : format(new Date(), "yyyy-MM-dd"),
            changefreq: pagesConfig["/*"].changefreq,
            priority: pagesConfig["/*"].priority,
          };
        }
      }
    } else {
      if (checkFolders(file)) {
        const dir = `${pagesDirectory}/${file.name}`;
        const subFiles = fs.readdirSync(dir, { withFileTypes: true });
        subFiles.forEach((subFile) => {
          if (checkFile(subFile)) {
            if (
              !siteMapObj[`${file.name}/${subFile.name}`] &&
              !subFile.isDirectory()
            ) {
              const date = fs.statSync(`${dir}/${subFile.name}`).mtime;
              const lastModDate = format(date, "yyyy-MM-dd");
              siteMapObj[`${file.name}/${subFile.name}`] = {
                loc: `${baseUrl}/${file.name}/${subFile.name}`,
                fileurl: `${file.name}/${subFile.name}`.replace(".html", ""),
                lastmod: useFileUpdateDate
                  ? lastModDate
                  : format(new Date(), "yyyy-MM-dd"),
                changefreq: pagesConfig["/**/*"].changefreq,
                priority: pagesConfig["/**/*"].priority,
              };
            }
          }
        });
      }
    }
  });
  var excludeurls = ["404", "503"]; //excluded urls for sitemap

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset      
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  async_loop.forEachOf(
    Object.values(siteMapObj),
    (obj, index, callback) => {
      if (obj.fileurl && obj.fileurl.split(".amp").length == 2) {
        var findobj = services
          .concat(exclusiveservices)
          .find((obj1) => obj1.url == obj.fileurl.split(".amp")[0]);
        if (findobj == undefined) {
        } else {
          const url = obj.fileurl.split(".amp")[0];
          if (!excludeurls.includes(url)) {
            xml += "<url>";
            xml += `<loc>${obj.loc.replace(".html", "")}</loc>`;
            xml += `<lastmod>${obj.lastmod}</lastmod>`;
            xml += `<changefreq>${obj.changefreq}</changefreq>`;
            xml += `<priority>${obj.priority}</priority>`;
            xml += "</url>";
          }
        }
        callback(null);
      } else if (!excludeurls.includes(obj.fileurl)) {
        //checking the non excluded urls
        xml += "<url>";
        xml += `<loc>${obj.loc.replace(".html", "")}</loc>`;
        xml += `<lastmod>${obj.lastmod}</lastmod>`;
        xml += `<changefreq>${obj.changefreq}</changefreq>`;
        xml += `<priority>${obj.priority}</priority>`;
        xml += "</url>";
        callback(null);
      } else {
        callback(null);
      }
    },
    function (err) {
      if (err) {
      } else {
        xml += "</urlset>";
        fs.writeFileSync(`${targetDirectory}/services-sitemap.xml`, xml);
      }
    }
  );
};

const executeCmd = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        err.message = cmd + "\n" + err.message;
        return reject(err);
      }
      return resolve(stdout || stderr);
    });
  });
};

(async () => {
  sitemap({
    baseUrl: "https://vakilsearch.com/business-setup",
    pagesDirectory: __dirname + "/.next/server/pages",
    targetDirectory: __dirname + "/public",
    pagesConfig: {
      "index.html": {
        // Only Index.html
        priority: "1",
        changefreq: "never",
      },
      "/*": {
        priority: "0.90",
        changefreq: "never",
      },
      "/**/*": {
        priority: "0.80",
        changefreq: "never",
      },
    },
    useFileUpdateDate: true, // if 'true' change lastmod to filedate else sitemap generation date
  });

  console.log("Sitemap.xml generated!");

  try {
    if (awsCDN) {
      const removeFilesFromS3 = await executeCmd(
        "aws s3 rm s3://qe-assets.vakilsearch.com/gateway-services/ --recursive"
      );
      console.log(removeFilesFromS3);
      const copyFilesFromS3 = await executeCmd(
        "aws s3 cp .next/static/ s3://qe-assets.vakilsearch.com/gateway-services/_next/static/ --recursive --metadata-directive REPLACE --cache-control max-age=31536000"
      );
      console.log(copyFilesFromS3);
    }
    if (isProd) {
      const removeFilesFromS3 = await executeCmd(
        "aws s3 rm s3://assets.vakilsearch.com/gateway-services/ --recursive"
      );
      console.log(removeFilesFromS3);
      const copyFilesFromS3 = await executeCmd(
        "aws s3 cp .next/static/ s3://assets.vakilsearch.com/gateway-services/_next/static/ --recursive --metadata-directive REPLACE --cache-control max-age=31536000"
      );
      console.log(copyFilesFromS3);
    }
  } catch (e) {
    console.error(e);
  }
})();
