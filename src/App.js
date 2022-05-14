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
        const cats = await api.fetchCats(keyword)
        this.searchResult.setState({
          isLoading:true,
        })
        this.setState(cats.data)
      },
      onClick: async() => {
        const cats = await api.randomFetchCats()
        this.searchResult.setState({
          isLoading:true,
        })
        this.setState(cats.data)
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async(image) => {
        const catInfo = await api.fetchCatInfo(image.id)
        this.imageInfo.setState({
          isLoading:false,
          visible: true,
          catInfo : catInfo.data
        });
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
