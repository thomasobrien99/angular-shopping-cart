app.controller('ListController', ListController)

ListController.$inject =["InventoryService", "$http"];

function ListController(InventoryService, $http){
  this.orderPref = 'default';
  
  //////////////////////////////////////////////////
  var vm = this;
  $http.get('/api/teas').then(function(res){
    vm.items = res.data;
  })

  //this.items = InventoryService.getInventory();
  //////////////////////////////////////////////////
  
  this.inCartFilter = function(item)
  {
    return item.quantity > 0;
  }

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

SearchController.$inject = ["InventoryService", "$http"];


//////////////////////////////////////////////
// Bag count is not working because it is checking against the old inventory;
// Also the new inventory is not being updated based on clicks;
//////////////////////////////////////////////
function SearchController(InventoryService, $http){
  var vm = this;

  this.changeSearch = function(type){
  	if(type === "category") InventoryService.changeSearchTerm(this.searchCategory, type); //THIS COULD BE WAY CLEANER
  	if(type === "name") InventoryService.changeSearchTerm(this.searchName, type);
  }

  vm.size = 0;
  
  $http.get('/api/teas').then(function(res){
      vm.size = res.data.reduce((p,c)=>{
      return p += c.quantity;
    },0) 
  })
    // var size = InventoryService.getInventory().reduce((p,c)=>{
    //   return p += c.quantity;
    // },0) 
    // return vm.size ? vm.size : "Bag is Empty!"
  
}
