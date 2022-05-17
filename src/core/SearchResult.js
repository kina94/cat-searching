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
    if (this.data === null) {
      this.$searchResult.style.display='none';
    } else {
        this.$searchResult.style.display='grid';
        this.$searchResult.innerHTML =
          this.data.length > 1 ?
            this.data.map(
              (cat, index) => `
              <div id=${index} class="item">
                <img src=${cat.url} title=${cat.name} loading='lazy' alt=${cat.name}
                width='200' height='200'>
              </div>
            `).join("") :
            `<div>
            ${
              this.data.url ? `<img class='CatGif' src='${this.data.url}'/>` :
              `<p>검색 결과가 없습니다.</p>`
            }
             </div>`
    }

    this.$searchResult.addEventListener('click', (e) => {
      try{
        const itemId = e.target.closest('div').id
        if(itemId){
          this.onClick(this.data[itemId])
        }
      }catch{
        return
      }
    })

  }
}
