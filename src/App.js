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

    const handleSearch = async (keyword, isRandom) => {
      this.Loading.setState(true)
      let res = null
      if (isRandom) {
        res = await api.randomFetchCats()
      } else {
        res = await api.fetchCats(keyword)
      }
      this.searchResult.setState(res.data)
      localStorage.setItem('cats', JSON.stringify(res.data))
      this.Loading.setState(false)
    }

    //components
    this.header = new Header({
      $target,
      onClick: async () => {
        this.Loading.setState(true)
        const catGif = await api.theCatApi()
        this.searchResult.setState(catGif[0])
        this.Loading.setState(false)
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
        this.Loading.setState(true)
        const catInfo = await api.fetchCatInfo(image.id)
        this.imageInfo.setState({
          visible: true,
          catInfo: catInfo.data
        })
        this.Loading.setState(false)
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
