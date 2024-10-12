const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "51a1f68f9fmsh758a3e716f3d48fp132e0ajsnde0777a54584",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

//*Fonksiyonların bir arada tutulması için 'Class' yapısını

//!export default (default) tanımlanan bağlantıyı {} bu parantez içinde yazılmadan da çağırmayı sağlar.
export default class API {
  //*Popüler müzikler getirme

  async getPopular() {
    const data1 = await this.searchMusic("Shamrain");
    const data2 = await this.searchMusic("Thurisaz");
    const data3 = await this.searchMusic("Pentagram");

    return [...data1, ...data2, ...data3];
  }

  //*Aratılan müzikleri getirme
  async searchMusic(query) {
    //*Term parametresini dinamik olarak belirledik
    const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`;

    //*API'ye istek atıp gelen cevabı işledik
    const res = await fetch(url, options);
    const data = await res.json();

    //* veriyi formatladık
    const formatted = data.tracks.hits.map((item) => item.track);
    //*Fonksiyonun çağrıldığı yere veriyi döndürdük
    return formatted;
  }
}
