import SearchInput from './core/SearchInput.js'
import SearchResult from './core/SearchResult.js'
import ImageInfo from './core/ImageInfo.js'
import Header from './core/Header.js'
import Loading from './core/Loading.js'
import DarkMode from './core/DarkMode.js'
import { api } from './service/api.js'


console.log("app is running!");
export default class App {
  $target = null;
  data = null;

  constructor($target) {
    this.$target = $target;

    this.darkMode = new DarkMode({ $target })
    this.Loading = new Loading({ $target, state: false })

    //localstorage
    const savedHistory = localStorage.getItem('search')
    const savedCats = localStorage.getItem('cats')

    //function
    const loadingToggle = () => {
      this.Loading.setState(this.Loading.state ? false : true)
    }

    const handleSearch = async (keyword, isRandom) => {
      loadingToggle()
      let res = null
      if (isRandom) {
        res = await api.randomFetchCats()
      } else {
        res = await api.fetchCats(keyword)
      }
      this.searchResult.setState(res.data)
      localStorage.setItem('cats', JSON.stringify(res.data))
      loadingToggle()
    }

    //components
    this.header = new Header({
      $target,
      onClick: async () => {
        loadingToggle()
        const catGif = await api.theCatApi()
        this.searchResult.setState(catGif[0])
        loadingToggle()
      }
    })

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword, isRandom) => { // 키보드와 검색 기록을 통한 검색
        handleSearch(keyword, isRandom)
      },
      searchKeyword : savedHistory ? JSON.parse(savedHistory) : []
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: JSON.parse(savedCats),
      onClick: async (image) => {
        loadingToggle()
        const catInfo = await api.fetchCatInfo(image.id)
        this.imageInfo.setState({
          visible: true,
          catInfo: catInfo.data
        })
        loadingToggle()
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      },
      modalClose: () => {
        this.imageInfo.setState({
          visible: false,
        })
      }
    });


  }
}
