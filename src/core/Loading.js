export default class Loading {
    constructor({$target, state}){
        this.$target = $target
        this.state = state
        const $Loading = document.createElement('div')
        this.$Loading = $Loading
        $Loading.className = 'Loading'
        $target.appendChild($Loading)

        this.render()
    }

    setState(nextState){
        this.state= nextState;
        this.render()
    }

    render(){
        this.$Loading.innerHTML=
        `<div class='Loading'>
        <div class='LoadingSpinner'></div>
        <p class='LoadingMessage'>Loading...</p>
        </div>
        `
        
        document.querySelector('#App').style.pointerEvents = this.state ? 'none' : 'auto'
        this.$Loading.style.display = this.state ? 'block' : 'none'
    }
}