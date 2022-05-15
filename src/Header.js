export default class SearchResult {
  constructor({ $target, onClick }) {
    this.$header = document.createElement("header");
    this.$header.className = "Header";
    $target.appendChild(this.$header);
    this.onClick = onClick;

    this.render();
  }

  render() {
    this.$header.innerHTML =
    `
    <p style="Random">Random GIF?</br>👇Click me!</p>
    <img class="Home" src="./assets/cat.png">`
    
    this.$header.addEventListener('click', (e)=>{
        if(e.target.className === 'Home'){
            this.onClick()
        }
    })
  }
}
