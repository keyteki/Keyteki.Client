/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const i18nextParser = require('i18next-parser').gulp;

gulp.task('i18next', function() {
    gulp.src('src/**/*.{ts,tsx}')
        .pipe(
            new i18nextParser({
                locales: ['de', 'en', 'es', 'fr', 'it', 'pl', 'pt', 'th', 'zh-CN', 'zh-TW'],
                output: 'src/translations/$LOCALE/$NAMESPACE.json'
            })
        )
        .pipe(gulp.dest('./'));
});
