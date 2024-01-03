module.exports = {
    recursive: true,
    colors: true,
    reporter: 'list',
    require: ['@babel/register', 'test/prepare', 'test/setup']
}