const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const api = {
  fetchCats: async(keyword) => {
    try{
      const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`)
      if(!res.ok) throw new Error('에러 발생')
      return await res.json()
    } catch(e){
      throw new Error(`다음과 같은 에러 발생 ${e.message}${e.status}`)
    }
  }, 

  randomFetchCats : async() => {
    try{
      const res = await fetch(`${API_ENDPOINT}/api/cats/random50`)
      if(!res.ok) throw new Error('에러 발생')
      return await res.json()
    } catch(e){
      throw new Error(`다음과 같은 에러 발생 ${e.message}${e.status}`)
    }
  },

  fetchCatInfo : async(catId) =>{
    try{
      const res = await fetch(`${API_ENDPOINT}/api/cats/${catId}`)
      if(!res.ok) throw new Error('에러 발생')
      return await res.json()
    } catch(e){
      throw new Error(`다음과 같은 에러 발생 ${e.message}${e.status}`)
    }
  }
};