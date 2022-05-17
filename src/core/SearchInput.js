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
    <img src='./src/assets/sad-cat.png'>
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

          if (targetName === 'random-button') { // 랜덤 고양이 버튼 클릭
            this.onSearch(null, true)
          }
          if (targetName === 'history-keyword'){ // 검색어 기록 클릭
            const keyword = e.target.value
            this.onSearch(keyword, false)
          }
          if (targetName === 'history-delete-button'){ // 검색어 기록 삭제 클릭
            const catId = e.target.closest('li').id
            this.searchKeyword.splice(catId,1)
            localStorage.setItem('search', JSON.stringify(this.searchKeyword))
            searchHistory.setState(this.searchKeyword)
          }
          if (targetName === 'search-input') { // 인풋 버튼 클릭
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