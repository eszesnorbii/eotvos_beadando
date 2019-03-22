<template>
  <div>
    <div class="header">{{pageName}}</div>
    <div class="menubar">
      <button
        class="menu-item"
        :key="i"
        v-for="(row,i) in menuButtons"
        @click="selectPage(row.name);"
      >{{row.name}}</button>
    </div>
    <h1 style="text-align: center;">{{selectedPage}}</h1>
    <template v-if="selectedPage=='Kezdőoldal'">
      <table>
        <tr>
          <td :key="i" v-for="(row,i) in menuButtons[0].tableRowNames">{{row}}</td>
        </tr>
        <tr :key="i" v-for="(row,i) in products">
          <td>{{row.name}}</td>
          <td>{{row.price}} {{currency}}</td>
          <td>
            <button @click="addToShoopingCart(row)">
              <img src="./assets/shopping-cart.png">
            </button>
          </td>
        </tr>
      </table>
    </template>
    <template v-if="selectedPage=='Kosár'">
      <div v-if="shoppingCart[0]">
        <table>
          <tr>
            <td :key="i" v-for="(row,i) in menuButtons[1].tableRowNames">{{row}}</td>
          </tr>
          <tr :key="i" v-for="(row,i) in shoppingCart">
            <td>{{row.name}}</td>
            <td>{{row.price}} {{currency}}</td>
            <td>
              <button @click="deleteFromShoopingCart(row)">
                <img src="./assets/delete.png" width="35" height="35">
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div v-else class="noDataMessage">
        Nincs adat!
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      pageName: "Web$$$hop Jah",
      menuButtons: [
        {
          name: "Kezdőoldal",
          tableRowNames: ["Termék megnevezése", "Ára", "Kosárba rakás"]
        },
        {
          name: "Kosár",
          tableRowNames: ["Termék megnevezése", "Ára", "Törlés"]
        }
      ],
      currency: "Ft",
      selectedPage: null,
      products: [],
      shoppingCart: []
    };
  },
  methods: {
    selectPage(pageName) {
      this.selectedPage = pageName;
      if (this.selectedPage == "Kezdőoldal") {
        this.getProducts();
      } else if (this.selectedPage == "Kosár") {
        this.getShoppingCart();
      }
    },
    getProducts() {
      this.axios.get("http://localhost:8082/products").then(resp => {
        this.products = resp.data;
      });
    },
    getShoppingCart() {
      this.axios.get("http://localhost:8082/shopping_cart").then(resp => {
        this.shoppingCart = resp.data;
      });
    },
    addToShoopingCart(item) {
      this.axios
        .post("http://localhost:8082/shopping_cart", { item: item })
        .then(() => {});
    },
    deleteFromShoopingCart(item) {
      this.axios.delete("http://localhost:8082/" + item._id).then(() => {});
      setTimeout(() => {
        console.log("setTImeout");
        this.getShoppingCart();
      }, 500);
    }
  }
};
</script>

<style>
.header {
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: lightblue;
  font-size: 200%;
}

.menubar {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  text-align: center;
  font-size: 150%;
}

.menu-item {
  flex-grow: 1;
}

table {
  margin: auto;
  border: 2px;
  border-radius: 5px;
  background-color: lightgray;
}
table td {
  text-align: center;
  width: 200px;
  height: 50px;
  border-radius: 3px;
  box-shadow: 1px 1px 4px black;
  color: black;
}

.noDataMessage {
  text-align: center;
  font-size: 200%;
}

img {
  width: 35px;
  height: 35px;
}
</style>
