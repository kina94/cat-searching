const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";
const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search?mime_types=gif'
const handleError = () =>{
  window.alert(`api 서버 오류입니다. 확인 버튼을 누르면 새로고침합니다.`)
  location.reload()
}
export const api = {
  fetchCats: async (keyword) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`)
      if (!res.ok) throw new Error('에러 발생')
      return await res.json()
    } catch (e) {
      handleError()
    }
  },

  randomFetchCats: async () => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/cats/random50`)
      if (!res.ok) throw new Error('에러 발생')
      return await res.json()
    } catch (e) {
      handleError()
    }
  },

  fetchCatInfo: async (catId) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/cats/${catId}`)
      if (!res.ok) throw new Error('에러 발생')
      return await res.json()
    } catch (e) {
      handleError()
    }
  },

  theCatApi: async () => {
    try {
      const res = await fetch(`${CAT_API_URL}`)
      if (!res.ok) throw new Error('에러 발생')
      return await res.json()
    } catch (e) {
      handleError()
    }
  }
};