/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://codedojo.motionukict.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,

  // Pages to exclude (add any private/auth routes here)
  exclude: [
    "/api/*",
    "/admin/*",
    "/_next/*",
    "/404",
    "/500",
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    additionalSitemaps: [
      // If you later add a blog, add it here:
      // "https://codedojo.motionukict.com/blog-sitemap.xml",
    ],
  },

  // Default values for all pages
  changefreq: "weekly",
  priority: 0.7,

  // Override priority for specific pages
  transform: async (config, path) => {
    // Homepage gets highest priority
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Main sections get high priority
    if (["/problems", "/courses", "/mentorship"].includes(path)) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    // Default for everything else
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};