// plop doc https://plopjs.com/documentation
module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('basic-component-generator', {
      description: 'this is a skeleton plopfile',
      prompts: [{
        type: 'input',
        name: 'packageName',
        message: '请输入package名称'
    }], 
    // array of inquirer prompts
    // dynamic action
      actions:(data)=>{
        let packageName = data.packageName;
        let _pack = packageName.toUpperCase();
        let  comName = _pack.split('').map((p,i)=>{
          if(p === packageName[i] && i !== 0 && i !== _pack.length -1 ) p = "-" + p;
          return p;
        }).join('').toLowerCase();
        return [{
          type: 'addMany',
          destination:"packages/{{packageName}}/",
          base:"plop-templates",
          data:{
            comName,
          },
          templateFiles: 'plop-templates/**/*.hbs',
          stripExtensions:['hbs'], //! 指定去掉文件的后缀 
      },] 
      } // array of actions
  });
};