export default class UI {
  //*Kullanılan arayüz elementlerinii (HTML) çağırma
  constructor() {
    this.list = document.querySelector(".list");
    this.form = document.querySelector("form");
    this.title = document.querySelector("#title");
    this.player = document.querySelector(".player");
    this.audio = document.querySelector(".player audio");
  }

  //!Ekrana kartları basma
  renderCards(songs) {
    //*Loader'ı temizle
    this.list.innerHTML = "";

    //*API'den gelen her bir nesne için ekrana kart renderla
    songs.forEach((song) => {
      const div = document.createElement("div");
      div.className = "card";

      //*Kart elemanına müzik bilgilerini dataset olarak ekleme
      div.dataset.title = song.title;
      div.dataset.subtitle = song.subtitle;
      div.dataset.img = song.images.coverarthq;
      div.dataset.mp3 = song.hub.actions[1].uri;

      div.innerHTML = `
      <figure>
              <img
                src="${song.images.coverarthq}"
              />
              <div class="play">
                <i class="bi bi-play-fill"></i>
              </div>
            </figure>

               <div class="card-info">
            <h3>${song.title}</h3>
            <h4>${song.subtitle}</h4>
          </div>
      
      `;
      this.list.appendChild(div);
    });
  }

  //*Ekrana loader basma
  renderLoader() {
    this.list.innerHTML = ` 
    <div class="loader">
    <h1>Loading...</h1>
    </div>

    `;
  }

  //*Başlığı günceller
  updateTitle(text) {
    this.title.textContent = text;
  }

  //*Oynatma alanı güncelleme
  renderPlayer(song) {
    this.player.innerHTML = `
     <div class="info">
     
        <img
          src="${song.img}"
          
        />

        <div>
          <h5>${song.title}</h5>
          <p>${song.subtitle}</p>
        </div>
      </div>

    
      <audio controls autoplay>
        <source
          src="${song.mp3}"
        />
      </audio>

      
      <div class="icons">
        <i class="bi bi-music-note-list"></i>
        <i class="bi bi-boombox-fill"></i>
        <i class="bi bi-pc-display"></i>
      </div>
    `;

    console.log(song);

    //*Audio elementini al ve oynat
    const audio = this.player.querySelector("audio");

    audio.addEventListener("play", this.toggleAnimation);
    audio.addEventListener("pause", this.toggleAnimation);
  }

  //*Animasyon yoksa ekle varsa çıkar
  toggleAnimation() {
    const img = document.querySelector(".info img");
    img.classList.toggle("animate");
  }
}
