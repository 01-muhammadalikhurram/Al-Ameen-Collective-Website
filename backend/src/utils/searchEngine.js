const Fuse = require('fuse.js');

const getSearchResults = (products, query) => {
  const options = {
    includeScore: true,
    threshold: 0.4, // high typo tolerance for better discovery
    keys: [
      { name: 'name', weight: 2 },
      { name: 'productCode', weight: 1.5 },
      { name: 'categories', weight: 1.5 },
      { name: 'productType', weight: 1 },
      { name: 'brand', weight: 1 },
      { name: 'summary', weight: 0.5 }
    ]
  };

  const fuse = new Fuse(products, options);
  const results = fuse.search(query);
  return results.map(result => result.item);
};

module.exports = {
  getSearchResults
};
