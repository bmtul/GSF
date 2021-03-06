var gulp = require('gulp'),
	postCss = require('gulp-postcss'),
	watch = require('gulp-watch'),
	importCss = require('postcss-import'),
	nested = require('postcss-nested'),
	variable = require('postcss-simple-vars'),
	autoprefixer = require('autoprefixer'),
	refresh = require('browser-sync').create(),
	nunjucksrender = require('gulp-nunjucks-render');


	gulp.task('style', function(){
		gulp.src('mainCss/style.css')
		.pipe(postCss([importCss, nested, variable, autoprefixer]))
		.pipe(gulp.dest('styling'));
	});


	gulp.task('nunjucks', function(){
		return gulp.src('views/**/*.html')
		.pipe(nunjucksrender({
			path:['templates']
			}))
		.pipe(gulp.dest('app'));
		});


	gulp.task('watch', ['nunjucks'], function(){
		refresh.init({
			notify:false,
			server:{
				baseDir:''
			}
		});

		watch('views/index.html', function(){
			refresh.reload();
		});

		watch('mainCss/**/*.css', function(){
			gulp.start('cssInject');
		});
	});


	gulp.task('cssInject', ['style'], function(){
		gulp.src('styling/style.css')
		.pipe(refresh.stream());
	});








