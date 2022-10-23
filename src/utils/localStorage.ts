export default {
    get:(key:string)=>{
        const value =   localStorage.getItem(key) ?? "{}"
        return JSON.parse(value)
    },

    set:(key:string,payload:any)=>{
        localStorage.setItem(key,JSON.stringify(payload))
    }
}