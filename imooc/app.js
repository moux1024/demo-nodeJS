var express = require('express');
var path = require('path');
// console.log(process);
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000
var app = express();
var _ =require('underscore');
mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade');
//app.use(express.bodyParser());
// app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.locals.moment = require('moment')
app.listen(port);

console.log('imooc started on port' + port)

//data
var MOVIE = {};
// MOVIE.index = [{
// 	title: '机械战警',
// 	_id: 1,
// 	doctor:'wangwu',
// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
// }, {
// 	title: '机械战警',
// 	_id: 2,
// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
// }, {
// 	title: '机械战警',
// 	_id: 3,
// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
// }, {
// 	title: '机械战警',
// 	_id: 4,
// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
// }, {
// 	title: '机械战警',
// 	_id: 5,
// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
// }, {
// 	title: '机械战警',
// 	_id: 6,
// 	poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
// }];
// MOVIE.detail = [{
// 	doctor: 'hs',
// 	country:'am',
// 	title:'jxzj',
// 	year:2014,
// 	poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
// 	language:'en',
// 	flash:'http://player.youku.com/plaer.php/sid/XNjA1Njc0NTUy/v.swf',
// 	summary:'summary'
// }]
MOVIE.admin = {
	title:'',
	doctor:'',
	country:'',
	year:'',
	poster:'',
	flash:'',
	summary:'',
	language:''
}
//index page
app.get('/', function(req, res) {
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index', {
			title: 'imooc',
			movies: movies
		})
	})
})

//detail page
app.get('/movie/:id', function(req, res) {
	var id = req.params.id;
	Movie.findById(id, function(err,movie){
	  console.log(movie);
		res.render('detail', {
			title: 'imooc'+movie.title,
			movies: [movie]
		})
	})
})

//list page
app.get('/list', function(req, res) {
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list', {
			title: 'imooc 列表页',
			movies: movies
		})
	})
})
//admin update movie
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'imooc 后台更新页',
				movie:movie
			})
		})
	}
})
//admin post movie
app.post('/admin/movie/new',function(req,res){
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	if(id=='undefined'){
	  _movie = new Movie({
      doctor:movieObj.doctor,
      title:movieObj.title,
      country:movieObj.country,
      language:movieObj.language,
      year:movieObj.year,
      poster:movieObj.poster,
      summary:movieObj.summary,
      flash:movieObj.flash
    });
    _movie.save(function(err,movie){
      if(err){
        console.log(err)
      }
      res.redirect('/movie/'+movie._id)
    })
	}else{
    Movie.findById(id,function(err,movie){
      if(err){
        console.log(err)
      }
      _movie = _.extend(movie,movieObj);
      _movie.save(function(err,movie){
        if(err){
          console.log(err)
        }
        res.redirect('/movie/'+movie._id)//重定向
      })
    })

	}
})
//admin page
app.get('/admin', function(req, res) {
	res.render('admin', {
		title: 'imooc admin',
		movie: MOVIE.admin
	})
})

//list delete movie
app.delete("/admin/list",function(req,res){
	var id = req.query.id;
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err)
			}else{
				res.json({success:1})
			}
		})
	}
})
