import React from 'react';

export default ({ params: {category,itemname},loadData }) => {
	const data = getThisItem(category,itemname,loadData);
	if (data == null) {
		console.log("Unable to find data for this item.");
		return (<div>Loading...</div>);
	} 

  
  return (
    <div className="item-view">
      ItemView for {data.itemName}
    </div>
  )

  function getThisItem(category, itemName, loadData) {
  	const itemData = loadData(category);
  	if (itemData == null) {
  		console.log("Data not ready yet.");
  		return null;
  	}
  	var result = null;
  	for (let item of itemData) {
  		const currentName = item.itemName.toLowerCase().replace(/ /, '');
      	if (currentName == itemName) {
      		result=item;
	      	break;
      	}
	}
    return result;
  }
}
