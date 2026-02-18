//part 1

var toDoList = {
  toDoItems: new Array(),
  addTasks: function (elm) {
    this.toDoItems.push(elm);
  },
  removeTask: function (val) {
    for (let i = 0; i < this.toDoItems.length; i++) {
      if (this.toDoItems[i] == val) this.toDoItems.splice(i, 1);
    }
  },
  listTasks: function () {
    this.toDoItems.forEach(function (elm) {
      if (elm != undefined) console.log(elm);
    });
  },
};
// toDoList.addTasks("do my homework");
// toDoList.addTasks("Study OS");
// toDoList.addTasks("Finish Task");
// toDoList.listTasks();
// toDoList.removeTask("Study OS");
// toDoList.listTasks();

//part2
var userProfile = {
  id: 0,
  name: "",
  age: 0,
  address: {
    street: "",
    city: "",
    getFullAddress: function () {
      return this.street + " " + this.city;
    },
  },
};
// userProfile.name = "habeba";
// userProfile.age = 25;
// console.log(userProfile.name, " ", userProfile.age);
// userProfile.address.city = "mansoura";
// userProfile.address.street = "elgesh";
// console.log(userProfile.address.city, " ", userProfile.address.street);

//Part 3

var userProfileManager = {
  ArrayOfUserProfileArrayObjects: new Array(),
  printUserProfiles: function () {
    this.ArrayOfUserProfileArrayObjects.forEach(function (elm) {
      console.log(
        "id: ",
        elm.id,
        "name: ",
        elm.name,
        "age: ",
        elm.age,
        "Location: ",
        elm.address.getFullAddress(),
      );
    });
  },
  AddingNewUserProfile: function (user) {
    this.ArrayOfUserProfileArrayObjects.push(user);
  },
  RemoveUserProfile: function (id) {
    for (let i = 0; i < this.ArrayOfUserProfileArrayObjects.length; i++) {
      if (this.ArrayOfUserProfileArrayObjects[i].id == id)
        this.ArrayOfUserProfileArrayObjects.splice(i, 1);
    }
  },
  GetUserProfileObject: function (name) {
    for (let i = 0; i < this.ArrayOfUserProfileArrayObjects.length; i++) {
      if (
        this.ArrayOfUserProfileArrayObjects[i].name.toLowerCase() ==
        name.toLowerCase()
      )
        console.log(
          "Name is ",
          this.ArrayOfUserProfileArrayObjects[i].name,
          "age is ",
          this.ArrayOfUserProfileArrayObjects[i].age,
          "id is ",
          this.ArrayOfUserProfileArrayObjects[i].id,
          "Location is ",
          this.ArrayOfUserProfileArrayObjects[i].address.street,
          this.ArrayOfUserProfileArrayObjects[i].address.city,
        );
    }
  },
  SortbyId: function () {
    this.ArrayOfUserProfileArrayObjects.sort(function (a, b) {
      if (a.id > b.id) return 1;
      else if (a.id < b.id) return -1;
      else return 0;
    });
  },

  SortbyName: function () {
    this.ArrayOfUserProfileArrayObjects.sort(function (a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      else if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      else return 0;
    });
  },
};
// var user1 = { id: 1, name: "Habeba", age: 21 };
// var user2 = { id: 3, name: "Ahmed", age: 22 };
// var user3 = { id: 4, name: "Hanen", age: 23 };
// var user4 = { id: 7, name: "Wafaa", age: 24 };
// var user5 = { id: 2, name: "Omar", age: 25 };

// userProfileManager.AddingNewUserProfile(user1);
// userProfileManager.AddingNewUserProfile(user2);
// userProfileManager.AddingNewUserProfile(user3);
// userProfileManager.AddingNewUserProfile(user4);
// userProfileManager.AddingNewUserProfile(user5);
// userProfileManager.printUserProfiles();
// userProfileManager.SortbyId();
// console.log("Sorted by Id");
// userProfileManager.printUserProfiles();
// userProfileManager.SortbyName();
// console.log("Sorted by Name");
// userProfileManager.printUserProfiles();
// console.log("Remove user by ID 7");
// userProfileManager.RemoveUserProfile(7);
// userProfileManager.printUserProfiles();
// console.log("Get user by name");
// userProfileManager.GetUserProfileObject("habeba");

//Form Code
var ageVal = document.getElementsByClassName("age")[0];
var nameVal = document.getElementsByClassName("user")[0];
var idVal = document.getElementsByClassName("id")[0];
var cityVal = document.getElementsByClassName("city")[0];
var streetVal = document.getElementsByClassName("street")[0];

var addUserButton = document.getElementsByClassName("adduser")[0];
var result = document.getElementsByClassName("output")[0];

addUserButton.addEventListener("click", function () {
  //Validation
  if (nameVal.value == "" || ageVal.value == "" || idVal.value == "") {
    result.innerHTML = "please enter a valid data ";
  } else if (Number(nameVal.value)) {
    result.innerHTML = "please enter letters";
  } else if (nameVal.value.length < 3) {
    result.innerHTML = "please enter a valid name";
  } else {
    var x = JSON.parse(JSON.stringify(userProfile));
    x.id = idVal.value;
    x.name = nameVal.value;
    x.age = ageVal.value;
    x.address.street = streetVal.value;
    x.address.city = cityVal.value;
    x.address.getFullAddress = userProfile.address.getFullAddress;
    userProfileManager.AddingNewUserProfile(x);
  }
});
