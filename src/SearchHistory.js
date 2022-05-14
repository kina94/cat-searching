export default class SearchHistory {
    data = null
    constructor({ $target, onClick }) {
        this.$target = $target
        this.$onClick = onClick
        const $searchHistory = document.createElement('div')
        this.$searchHistory = $searchHistory
        $searchHistory.className = 'SearchHistory'
        $target.appendChild($searchHistory)

        this.render()
    }

    setState(nextData) {
        this.data = nextData
        this.render()
    }

    render() {
        if (this.data!=null) {
            this.$searchHistory.innerHTML =
                `
        <ul>
        ${this.data.map(history => {
                    return `<li id=${history}>${history}</li>`
                }).join('')
                }
        </ul>
        `
        }
    }
}