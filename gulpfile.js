const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');

// 清除上次打包后的产物
gulp.task('clean', async () => {
  await del('lib/**');
  await del('es/**');
  await del('dist/**');
});

// 引用tsconfig， ts -> babel解析
gulp.task('es', () => {
  // 生成ts配置项
  const tsProject = ts.createProject('tsconfig.pro.json', {
    model: 'ESNext',
  });
  // console.log(tsProject);
  // 1运行ts配置    2babel解析    3生成文件
  return tsProject.src().pipe(tsProject()).pipe(babel()).pipe(gulp.dest('es/'));
});

// 通过es/ 解析成cjs lib/
gulp.task('lib', () => {
  return gulp
    .src('./es/**/*.js')
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('lib/'));
});

// 导出声明文件 .d.ts
gulp.task('declaration', () => {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    declaration: true, // 是否生成声明文件
    emitDeclarationOnly: true, // 是否只生成声明文件
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('es/')).pipe(gulp.dest('lib/'));
});

// 复制readme
gulp.task('copyReadme', async () => {
  await gulp.src('../../README.md').pipe(gulp.dest('../../packages/hooks'));
});

exports.default = gulp.series('clean', 'es', 'lib', 'declaration', 'copyReadme');
