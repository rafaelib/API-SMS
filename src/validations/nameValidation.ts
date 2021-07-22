function nameValidation(str :string){
    if (typeof(str)!== "string" || str.length < 1) return false

    return true;
}  

export default nameValidation;