app.controller('ListController', ListController)

ListController.$inject =["InventoryService"];

function ListController(InventoryService){
  this.orderPref = 'default';

	this.items = InventoryService.getInventory();

  this.cartTotal = function(){
    return this.items.reduce((p,c)=>{
      return p+c.quantity*c.price;},0)
  };

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
  this.subtotal = function(){
    return this.item.quantity.this.item.price;
  }

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

  this.bagSize = function(){
    var size = InventoryService.getInventory().reduce((p,c)=>{
      return p += c.quantity;
    },0) 
    return size ? size : "Bag is Empty!"
  }
}
