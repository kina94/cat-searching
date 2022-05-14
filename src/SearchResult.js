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

  // LazyLoader = (target) => {
  //   const io = new IntersectionObserver(entries => {
  //     if (entries.some(entry => entry.intersectionRatio > 0)) {
  //       target.style.border = '5px solid black'
  //     }
  //   }, {threshold: 0.5})
  //   io.observe(target)
  //   return io
  // }


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

    // const items = document.querySelectorAll('.item')
    // const ioWrap = []
    // for (const item of items) {
    //   ioWrap.push(this.LazyLoader(item))
    // }

    this.$searchResult.addEventListener('click', (e) => {
      const itemId = e.target.parentNode.id
      if(itemId){
              this.onClick(this.data[itemId])
      }
    })
    // this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
    //   $item.addEventListener("click", () => {
    //     this.onClick(this.data[index]);
    //   });
    // });
  }
}
