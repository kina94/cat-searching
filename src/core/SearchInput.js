import SearchHistory from "./SearchHistory.js";

export default class SearchInput {
  constructor({ $target, onSearch, onClick, searchKeyword }) {
    this.$target = $target
    this.onClick = onClick
    this.onSearch = onSearch
    this.searchKeyword = searchKeyword

    const $searchSection = document.createElement('section');
    this.$searchSection = $searchSection
    $searchSection.className = 'search-section'
    $target.appendChild($searchSection)
    this.render();
  }

  render() {
    this.$searchSection.innerHTML =
      `
    <section class='search'>
    <input class='search-input' type='text' placeholder='고양이를 검색해보세요🐱' autofocus/>
    <button class='random-button'>
    <span>Click me!</span>
    <img class='random-button-img' src='./src/assets/sad-cat.png'>
    </button>
    </section>
    `

    const searchHistory = new SearchHistory({
      $target: this.$searchSection,
      data: this.searchKeyword,
    })

    const addSearchKeyword = (keyword) => {
      if(this.searchKeyword.includes(keyword)){
        return
      } else {
        if (this.searchKeyword.length > 4) {
          this.searchKeyword.shift()
          this.searchKeyword.push(keyword)
        } else {
          this.searchKeyword.push(keyword)
        }
      }
      localStorage.setItem('search', JSON.stringify(this.searchKeyword))
      searchHistory.setState(this.searchKeyword)
    }

    const handleClickEvent = () => {
      this.$searchSection.addEventListener('click', e => {
        try {
          const targetName = e.target.className
          switch (targetName){
            case 'random-button' || 'random-button-img':
              this.onSearch(null, true)
            
            case 'history-keyword':
              const keyword = e.target.value
              this.onSearch(keyword, false)
            
            case 'history-delete-button':
              const catId = e.target.closest('li').id
              this.searchKeyword.splice(catId,1)
              localStorage.setItem('search', JSON.stringify(this.searchKeyword))
              searchHistory.setState(this.searchKeyword)

            case 'search-input':
              if (e.target.value) {
                e.target.value = ''
              }
          }
        } catch{
          return
        }
      })
    }

    this.$searchSection.addEventListener("keyup", e => {
      try {
        const inputValue = e.target.closest('input').value
        if (e.key === 'Enter') {
          if (!inputValue) {
            window.alert('검색어를 입력해주세요.')
          } else {
            this.onSearch(inputValue, false);
            addSearchKeyword(inputValue)
          }
        }
      } catch {
        return
      }
    });

    handleClickEvent()
  }
}