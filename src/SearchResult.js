export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
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
    if (this.data === null) {
      this.$searchResult.innerHTML = '검색어 입력!'
    } else {
      if (this.data.isLoading) {
        this.$searchResult.innerHTML = 'Loading...'
      } else {
        this.$searchResult.innerHTML =
          this.data.length != 0 ?
            this.data.map(
              (cat,index) => `
              <div id=${index} class="item">
                <img src=${cat.url} alt=${cat.name} />
              </div>
            `
            )
              .join("") : '검색된 결과가 없습니다.'
      }
    }

    this.$searchResult.addEventListener('click', (e)=>{
      const itemId = e.target.parentNode.id
      this.onClick(this.data[itemId])
    })

    // this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
    //   $item.addEventListener("click", () => {
    //     this.onClick(this.data[index]);
    //   });
    // });
  }
}
