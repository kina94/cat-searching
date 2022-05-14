import SearchHistory from "./SearchHistory.js";

const TEMPLATE = '<input type="text">';

export default class SearchInput {
  searchKeyword = []
  constructor({ $target, onSearch, onRandomClick, onHistoryClick }) {
    this.$target = $target
    this.onSearch = onSearch
    this.onRandomClick = onRandomClick
    this.onHistoryClick = onHistoryClick
    const $searchSection = document.createElement('section');
    this.$searchSection = $searchSection
    $searchSection.className = 'SearchSection'
    $target.appendChild($searchSection)

    this.render();
  }

  render() {
    this.$searchSection.innerHTML =
      `
    <input class='SearchInput' placeholder='고양이를 검색해보세요.' autofocus/>
    <button class='RandomButton'>🐱</button>
    `

    const searchHistory = new SearchHistory({$target: this.$searchSection,
      data: this.searchKeyword})

    this.$searchSection.addEventListener('click', (e)=>{
      if(this.searchKeyword.includes(e.target.id)){
        this.onHistoryClick(e.target.id)
      }
    })

    this.$searchSection.querySelector('.SearchInput').addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        this.onSearch(e.target.value);
        if(this.searchKeyword.length>5){
          this.searchKeyword.shift()
        } else{
          this.searchKeyword.unshift(e.target.value)
        }
        searchHistory.setState(this.searchKeyword)
      }
    });

    this.$searchSection.querySelector('.SearchInput').addEventListener('click', e => {
      if(e.target.value){
        e.target.value = ''
      } 
    })

    this.$searchSection.querySelector('.RandomButton').addEventListener('click', () =>{
      this.onRandomClick()
    })
  }
}