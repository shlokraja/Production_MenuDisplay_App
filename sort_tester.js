var ll = [ { item_id: '162', sold: false, veg: true },
    { item_id: '168', sold: true, veg: true } ,
    { item_id: '163', sold: false, veg: false },
   { item_id: '165', sold: true, veg: true },
    { item_id: '166', sold: false, veg: true } ,
   { item_id: '167', sold: false, veg: false },
   { item_id: '169', sold: true, veg: true },
    { item_id: '164', sold: true, veg: true },
    { item_id: '170', sold: true, veg: false } ]

console.log(JSON.stringify(ll));

ll.sort(function(a,b){
    if (a["sold"] != b["sold"]) {
      if (a["sold"] < b["sold"]) {
        return -1;
      } else {
        return 1;
      }
    } else if (a["veg"] != b["veg"]) {
      if (a["veg"] < b["veg"]) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return (Number(a["item_id"]) - Number(b["item_id"]));
    }
  });

console.log(JSON.stringify(ll));
