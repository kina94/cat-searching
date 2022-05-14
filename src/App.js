import SearchInput from './SearchInput.js'
import SearchResult from './SearchResult.js'
import ImageInfo from './ImageInfo.js'
import {api} from './api.js'

console.log("app is running!");
export default class App {
  $target = null;
  data = null;

  constructor($target) {
    this.$target = $target;
    const savedHistory = localStorage.getItem('search')
    const savedCats = localStorage.getItem('cats')
    let searchKeyword = savedHistory ? JSON.parse(savedHistory) : []

    //로딩창 토글
    const loadingToggle = () =>{
      this.searchResult.setState({
        isLoading:true
      })
    }

    //키보드로 서치할 때마다 검색 기록을 추가하고 로컬스토리지에 저장
    const addSearchKeyword = (keyword) =>{
      if(searchKeyword.length>5){
        searchKeyword.shift()
      } else{
        searchKeyword.unshift(keyword)
      }
      localStorage.setItem('search', JSON.stringify(searchKeyword))
    }

    //키워드와 랜덤여부로 구분하여 검색
    const handleSearch = async(keyword, isRandom) => {
      loadingToggle()
      let res = null
      if(isRandom){
        res = await api.randomFetchCats()
      } else{
        res = await api.fetchCats(keyword)
      }
      this.setState(res.data)
      localStorage.setItem('cats', JSON.stringify(res.data))
    }

    //검색창
    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => { // 키보드 검색
        handleSearch(keyword, false)
        addSearchKeyword(keyword)
      },
      onRandomClick: () => { // 랜덤 고양이 클릭
        handleSearch(null, true)
      },
      onHistoryClick: (keyword) => { // 히스토리 검색
        handleSearch(keyword, false)
      },
      searchKeyword
    });

    //검색 결과
    this.searchResult = new SearchResult({
      $target,
      initialData: JSON.parse(savedCats),
      onClick: async(image) => {
        loadingToggle()
        const catInfo = await api.fetchCatInfo(image.id)
        this.imageInfo.setState({
          visible: true,
          catInfo : catInfo.data
        })
        this.setState(this.data)
      }
    });

    //고양이 상세 이미지
    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      },
      modalClose : () => {
        this.imageInfo.setState({
          visible:false,
        })
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
