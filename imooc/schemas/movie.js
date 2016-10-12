var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:Number,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

MovieSchema.pre('save',function(next){
  if(this.isNew){
    for(x in Date){
      console.log(x);
    }
    this.meta.createAt = this.meta.updateAt = Date()
  }else{
    this.meta.updateAt = Date()
  }
  next()//让存储流程继续下去
})

MovieSchema.statics = {
	fetch:function(cb){
		return this
			.find({})//???
			.sort('meta.updateAt')
			.exec(cb)
	},
  findById:function(id,cb){
    return this
      .findOne({_id:id})
      .exec(cb)
  }
}

module.exports = MovieSchema;