export default class SearchResult {
  constructor({ $target, onClick }) {
    this.$header = document.createElement("header");
    $target.appendChild(this.$header);
    this.onClick = onClick;

    this.render();
  }

  render() {
    this.$header.innerHTML =
    `
    <p>Random GIF?</br>👇Click me!</p>
    <img class="random-gif" src="./src/assets/cat.png">`
    
    this.$header.addEventListener('click', (e)=>{
        if(e.target.className === 'random-gif'){
            this.onClick()
        }
    })
  }
}
