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

    this.searchInput = new SearchInput({
      $target,
      onSearch: async(keyword) => {
        this.searchResult.setState({
          isLoading:true,
        })
        const cats = await api.fetchCats(keyword)
        this.setState(cats.data)
      },
      onClick: async() => {
        this.searchResult.setState({
          isLoading:true,
        })
        const cats = await api.randomFetchCats()
        this.setState(cats.data)
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async(image) => {
        this.searchResult.setState({
          isLoading:true,
        })
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
