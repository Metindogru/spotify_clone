import API from "./api.js";
import UI from "./ui.js";

//*Class'ın örnek yapısını alma (Methodları kullanabilmek için)
const api = new API();
const ui = new UI();

//*Sayfa yüklendiği anda popüler müzikleri renderla
document.addEventListener("DOMContentLoaded", async () => {
  //*Ekrana Loader basma
  ui.renderLoader();

  //!API'ya istek atma
  api
    .getPopular()
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("Üzgünüz bir sorun oluştu");
    });
});

//*Form'dan bir şeyler aratıldığında APİ'dan aratılan kelimeye uygun sonuçları renderla

ui.form.addEventListener("submit", (e) => {
  //*Sayfa yenilemeyi engelle
  e.preventDefault();

  //*Aratılan kelimeye eriş
  const query = e.target[0].value;

  //*Aratılan kelime boşsa fonksiyonu çalıştırma, aramada boşluk bırakarak aramayı 'trim' ile kapattık.
  if (query.trim() === "") return alert("Lütfen geçerli bir metin aratın...");

  ///*Ekrana Loader bas
  ui.renderLoader();

  //*Başlığı güncelle
  ui.updateTitle(query + " için sonuçlar");

  //*API'dan verileri al
  api
    .searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("Üzgünüz bir sorun oluştu");
    });
});

//*Liste alanında ki tıklanma olaylarını izle
ui.list.addEventListener("click", (e) => {
  //*Eğer oynat butonuna tıklanırsa şarkıyı oynat
  if (e.target.className === "play") {
    //*Oynatılacak şarkının kartına eriş

    //!'Closest' parentElement ile üst klasöre ulaşmaya çalışırız. Closest ise en yakın karta erişmemizi daha kolay ve daha dinamik şekilde ulaşmamızı sağlar.
    const card = e.target.closest(".card");
    //*Oynatılacak şarkıların bilgilerini al
    const data = card.dataset;

    //*Player alanını tekrar rendarla
    ui.renderPlayer(data);
  }
});
