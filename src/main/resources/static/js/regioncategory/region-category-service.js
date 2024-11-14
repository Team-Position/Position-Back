const regionCategoryService = (() =>{
    const getCategoryA = async (callback) =>{
        const response = await fetch("/regioncategories/categoryA");
        const categoriesA = await response.json();

        if(callback){
            callback(categoriesA)
        }
    }
    const getCategoryB = async (categoryAId, callback) =>{
        const response = await fetch(`/regioncategories/categoryB/${categoryAId}`);
        const categoriesB = await response.json();
        console.log("소카 데이터:", categoriesB); // API 응답 확인

        if(callback){
            callback(categoriesB);
        }
    }
    return{getCategoryA:getCategoryA, getCategoryB:getCategoryB};
})()