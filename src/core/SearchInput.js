import SearchHistory from "./SearchHistory.js";

const TEMPLATE = '<input type="text">';

export default class SearchInput {
  constructor({ $target, onSearch, onRandomClick, onHistoryClick, 
    onHistoryDeleteClick, searchKeyword }) {
    this.$target = $target
    this.onSearch = onSearch
    this.onRandomClick = onRandomClick
    this.onHistoryClick = onHistoryClick
    this.onHistoryDeleteClick = onHistoryDeleteClick
    this.searchKeyword = searchKeyword
    const $searchSection = document.createElement('section');
    this.$searchSection = $searchSection
    $searchSection.className = 'SearchSection'
    $target.appendChild($searchSection)
    this.render();
  }

  render() {
    this.$searchSection.innerHTML =
      `
    <div class='Search'>
    <input class='SearchInput' type='text' placeholder='고양이를 검색해보세요🐱' autofocus/>
    <button class='RandomButton'>
    <span>Click me!</span>
    <img src='./src/assets/sad-cat.png'>
    </button>
    </div>
    `

    const searchHistory = new SearchHistory({$target: this.$searchSection,
      data: this.searchKeyword})

    const handleSearchHistory= () =>{
      this.$searchSection.addEventListener('click', (e)=>{
        if(e.target.className === 'delete'){
          this.onHistoryDeleteClick(e.target.closest('li').id)
          searchHistory.setState(this.searchKeyword)
        }
      })
  
      this.$searchSection.addEventListener('click', (e)=>{
        try{
          const catId = e.target.closest('li').id
          if(catId){
            this.onHistoryClick(catId)
          }
        }catch{
          return
        }
      })
    }

    const handleSearchInptut = () =>{
      this.$searchSection.querySelector('.SearchInput').addEventListener("keyup", e => {
        if (e.key === 'Enter') {
          if(!e.target.value){
            window.alert('검색어를 입력해주세요.')
          } else{
            this.onSearch(e.target.value);
            searchHistory.setState(this.searchKeyword)
          }
        }
      });
  
      this.$searchSection.querySelector('.SearchInput').addEventListener('click', e => {
        if(e.target.value){
          e.target.value = ''
        } 
      })
    }

    const handleRandomButton = () =>{
      this.$searchSection.querySelector('.RandomButton').addEventListener('click', () =>{
        this.onRandomClick()
      })
    }

    handleSearchInptut()
    handleSearchHistory()
    handleRandomButton()
  }
}