const gulp = require('gulp');

gulp.task('build-lib:sass', () =>
    gulp.src('projects/sfl-shared/assets/styles/**/*.scss')
        .pipe(gulp.dest('dist/sfl-shared/assets/styles')));