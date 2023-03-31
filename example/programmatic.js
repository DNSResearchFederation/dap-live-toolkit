let toolkit = new DAPLiveToolkit({
   'apiKey': "EyMcpguhOMeIvAEL",
   'apiSecret': "30Bgy4WDy6tBkNXZ"
});

toolkit.createTable("#top-100-domains", {
   "title": "Top 100 Popular Domains",
   "time": "15 Mar, 2023",
   "categories": "market, domain",
   "description": "Top 100 Popular domains as of today ranked by Tranco and compared with the highest Bucketed Rank supplied by Google CrUX for that domain",
   "feedSources": "Tranco, Google CrUX",
   "tableBottomCtaTitle":"All 1M Domains",
   "tableConnectionPath": "latest-highest-rank",
   "tableHeaders": "Domain Name, Tranco Rank, CruX Rank",
   "tableDataKeys":"domain,rank,cruxRankDisplay"
});

toolkit.createTable("#top-50-tld", {
   "title": "Top 50 TLD",
   "time": "15 Mar, 2023",
   "categories": "market, domain",
   "description": "The top 50 TLDs by active domain names as observed using the set of active domain names currently available to DAP.LIVE",
   "feedSources": "Tranco, Google CrUX",
   "tableBottomCtaTitle":"All TLDs",
   "tableConnectionPath": "top-50-tlds",
   "tableHeaders": "TLD, Totals, 7 day change",
   "tableDataKeys":"tld,latestTotal,percentageChange"
});

toolkit.createTable("#phishing-domains", {
   "title": "Top 50 Phishing Root Domains",
   "time": "15 Mar, 2023",
   "categories": "abuse",
   "description": "Top observed phishing root domains over the last 24 hours based upon all URLs processed from OpenPhish",
   "feedSources": "OpenPhish",
   "tableBottomCtaTitle":"All Phishing Root Domains",
   "tableConnectionPath": "top-phishing-domains",
   "tableHeaders": "Root Domain, Last 1 Day, 7 Day Change",
   "tableDataKeys":"domain_name,totalsLastHrs,totalsSevenDaysAgo"
});

toolkit.createLineChart('#domain-growth-7-days', {
   "title": "Domain Name Growth",
   "metricTitle": "Last 7 Days",
   "categories": "Market",
   "description": "Overall growth of active domain names currently being processed by DAP.LIVE tracked over the last 6 months",
   "feedSources": "ICANN Centralised Zone Data Service (CZDS), .UK, .EE, .NU, .SE CCTLD Zone Files",
   "lineChartConnectionPath": "domain-growth-6-months",
   "metricConnectionPath": "domain-growth-7-days",
   "metricProperty": "difference",
   "metricChangeProperty": "percentageChange",
   "chartBottomCtaTitle": "All growth data"
})

