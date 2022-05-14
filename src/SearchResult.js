export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  gifUrl = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("section");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  

  render() {
    if (this.data.breeds) {
      this.$searchResult.innerHTML =
      `<div class='Loading'>
      <img class='Loading' src='${this.data.url}'/>
      </div>
      `
    } else {
      if (this.data.isLoading) {
        this.$searchResult.innerHTML = 
        `<div class='Loading'>
        <div class='LoadingSpinner'></div>
        <p class='LoadingMessage'>Loading...</p>
        </div>
        `
      } else {
        this.$searchResult.innerHTML =
          this.data.length > 1 ?
            this.data.map(
              (cat, index) => `
              <div id=${index} class="item">
                <img src=${cat.url} title=${cat.name} loading='lazy' alt=${cat.name}
                width='200' height='200'>
              </div>
            `
            )
              .join(""): 
              
              '검색된 결과가 없습니다.'
      }
    }

    // this.$searchResult.addEventListener('click', (e) => {
    //   const itemId = e.target.parentNode.id
    //   if(itemId!=undefined){
    //     this.onClick(this.data[itemId])
    //   }
    // })

    
    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
