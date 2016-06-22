app.controller('ListController', ListController)

ListController.$inject =["InventoryService", "$http"];

function ListController(InventoryService, $http){
  var vm = this;

  vm.orderPref = 'default';

  InventoryService.getInventory().then(function(res){
    vm.items = res.data;
    vm.cartTotal = vm.items.reduce((p,c)=>{
      return p+c.quantity*c.price;},0)
  })

  vm.inCartFilter = function(item)
  {
    return item.quantity > 0;
  }

  // vm.cartTotal = function(){
  //   return vm.items.reduce((p,c)=>{
  //     return p+c.quantity*c.price;},0)
  // };

  vm.filterByCurrent = function(el){
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

ItemController.$inject = ["InventoryService", "$route"];

function ItemController(InventoryService, $route){
  var vm = this;

  vm.subtotal = function(){
    return vm.item.quantity*vm.item.price;
  }
  
	vm.showEditItemQuantityForm = false;

  vm.editItemQuantity = function(newQuant){
    InventoryService.editItemQuantity(vm.item.name, newQuant).then(function(res){
      vm.item.quantity = res.data[0];
      $route.reload();
    });
  } 
  
  vm.toggleEditItemQuantityForm = function(){
    vm.showEditItemQuantityForm = !vm.showEditItemQuantityForm;
  }
}

app.controller('SearchController', SearchController)

SearchController.$inject = ["InventoryService", "$http"];


function SearchController(InventoryService, $http){
  var vm = this;

  this.changeSearch = function(type){
  	if(type === "category") InventoryService.changeSearchTerm(this.searchCategory, type); //THIS COULD BE WAY CLEANER
  	if(type === "name") InventoryService.changeSearchTerm(this.searchName, type);
  }

  vm.size = 0;

  InventoryService.getInventory().then(function(res){
    vm.size = res.data.reduce((p,c)=>{
      return p += c.quantity;
    },0) 
  })

  
}
