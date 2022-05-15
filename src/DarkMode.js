export default class DarkMode {
    constructor({$target}){
        this.$template = document.createElement('div')
        this.$template.className = 'mode-button-wrapper'
        $target.appendChild(this.$template)

        this.render()
    }

    toggleMode (){
        if (document.body.dataset.theme === undefined) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                document.body.dataset.theme= 'light'
            } else {
                document.body.dataset.theme= 'dark'
            }
          } else {
            document.body.dataset.theme= document.body.dataset.theme==='dark' ? 'light' : 'dark'
          }
    }

    render(){
        this.$template.innerHTML=
        `
        <input type='checkbox' class='mode-button'>
        <i class="fas fa-paw"></i>
        `

        this.$template.addEventListener('click', (e)=>{
            e.target.closest('div') && this.toggleMode()
        })
    }
}