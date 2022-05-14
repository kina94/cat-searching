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

    const loadingToggle = () =>{
      this.searchResult.setState({
        isLoading:true
      })
    }

    const handleSearch = async(keyword, isRandom) => {
      loadingToggle()
      let res = null
      if(isRandom){
        res = await api.randomFetchCats()
      } else{
        res = await api.fetchCats(keyword)
      }
      this.setState(res.data)
    }

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        handleSearch(keyword, false)
      },
      onRandomClick: () => {
        handleSearch(null, true)
      },
      onHistoryClick: (keyword) => {
        handleSearch(keyword, false)
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async(image) => {
        loadingToggle()
        const catInfo = await api.fetchCatInfo(image.id)
        this.imageInfo.setState({
          visible: true,
          catInfo : catInfo.data
        })
        this.searchResult.setState(this.data)
      }
    });

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
