class ApiFetures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString
    }
    filter(){
        //filtering of  the data
        const queryObj ={...this.queryString}
        const excludedFields = ['page','sort','limit','fields']

        excludedFields.forEach(function(element){
            delete queryObj[element]
        })
        // advance filtering of  the data
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>
            `$${match}`
        )
        this.query.find(JSON.parse(queryStr))

        return this
    }
    sort(){
        //sorting
        if (this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(',')
            this.query = this.query.sort(sortBy )
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this
    }
    limitFields(){
        //Field limiting

        if(this.queryString.fields){
            const fields = req.query.fields.split(',').join('')
            this.query = this.query.select(fields)
        }else{
            this.query = this.query.select('-__v')
        }
        return this
    }
    paginate(){
        //this.querypagination_____________________________________
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 100
        const skip =(page-1) * limit
        this.query = this.query.skip(skip).limit(limit)

        
        return this
    }
}
module.exports = ApiFetures