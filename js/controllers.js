app.controller('ListController', ListController)

ListController.$inject =["InventoryService"];

function ListController(InventoryService){
	this.items = InventoryService.getInventory();
  this.bagSize = function(){
    //MAY NEED TO BIND THIS
    var size = this.items.reduce((p,c)=>{
      return p += c.quantity;
    },0)

    return size ? size : "Bag is Empty!"
  }
  this.orderBy = function()
  {
    if (InventoryService.orderPref === "true")
    {
      return true;
    }
    return false;
  }
  
  this.filterByCurrent = function(el){
  	if(!InventoryService.searchTerm) return true;
  	if(InventoryService.searchType === 'category') return el.categories.includes(InventoryService.searchTerm)
  	if(InventoryService.searchType === 'name') 
  	{
  		var re = new RegExp(InventoryService.searchTerm, 'i');
		  return el.name.match(re);
		}
	}
}

app.controller('ItemController', ItemController)

ItemController.$inject = ["InventoryService"];

function ItemController(InventoryService){
	this.showEditItemQuantityForm = false;

  this.editItemQuantity = InventoryService.editItemQuantity.bind(this.item);
  this.toggleEditItemQuantityForm = function(){
    this.showEditItemQuantityForm = !this.showEditItemQuantityForm;
  }
}

app.controller('SearchController', SearchController)

SearchController.$inject = ["InventoryService"];

function SearchController(InventoryService){
  this.changeSearch = function(type){
  	if(type === "category") InventoryService.changeSearchTerm(this.searchCategory, type); //THIS COULD BE WAY CLEANER
  	if(type === "name") InventoryService.changeSearchTerm(this.searchName, type);
  }
  this.changeOrder = function(orderPref){
    InventoryService.changeOrderPref(this.orderPref);
  }
}

app.controller('TotalController', TotalController);

TotalController.$inject = ["InventoryService"];

function TotalController(InventoryService){
  this.total = this.items.reduce((p,c)=>{
    return p + c.subtotal;
  },0)
}

