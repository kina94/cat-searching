export default class SearchHistory {
    data = null
    constructor({ $target, data, onClick }) {
        this.$target = $target
        this.data = data
        const $searchHistory = document.createElement('section')
        this.$searchHistory = $searchHistory
        $searchHistory.className = 'search-history'
        $target.appendChild($searchHistory)

        this.render()
    }

    setState(nextData) {
        this.data = nextData
        this.render()
    }

    render() {
        if (this.data != null) {
            this.$searchHistory.innerHTML =
                `
        <ul>
        ${this.data.map((history,index) => {
                    return `<li id=${index}>
                    <div class='history-keyword'>${history}</div>
                    <button class='history-delete-button'>❌</button>
                    </li>
                    `
                }).join('')
                }
        </ul>
        `
        }
    }
}