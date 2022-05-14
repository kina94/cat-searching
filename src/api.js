const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";
const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search?mime_types=gif'
export const api = {
  fetchCats: async (keyword) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`)
      if (!res.ok) throw new Error('에러 발생')
      return await res.json()
    } catch (e) {
      throw new Error(`서버 오류입니다! 다시 검색해주세요. ${e.message}${e.status}`)
    }
  },

  randomFetchCats: async () => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/cats/random50`)
      if (!res.ok) throw new Error('에러 발생')
      return await res.json()
    } catch (e) {
      throw new Error(`서버 오류입니다! 다시 검색해주세요. ${e.message}${e.status}`)
    }
  },

  fetchCatInfo: async (catId) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/cats/${catId}`)
      if (!res.ok) throw new Error('에러 발생')
      return await res.json()
    } catch (e) {
      throw new Error(`서버 오류입니다! 다시 검색해주세요. ${e.message}${e.status}`)
    }
  },

  theCatApi: async () => {
    try {
      const res = await fetch(`${CAT_API_URL}`)
      if (!res.ok) throw new Error('에러 발생')
      return await res.json()
    } catch (e) {
      throw new Error(`서버 오류입니다! 다시 검색해주세요. ${e.message}${e.status}`)
    }
  }
};