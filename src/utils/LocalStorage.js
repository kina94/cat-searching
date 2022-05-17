export const LocalStorage = {
    saveItem(saveName, item){
        localStorage.setItem(saveName, JSON.stringify(item))
    },
    loadItem(savedName){
        const savedItems = localStorage.getItem(savedName)
        return JSON.parse(savedItems)
    }
}